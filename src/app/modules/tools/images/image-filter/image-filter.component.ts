import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from 'src/app/modules/core/services/category.service';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { Category } from "../../../core/models/category";
import { Observable, startWith } from "rxjs";
import { map } from "rxjs/operators";
import { AsyncPipe } from "@angular/common";
import { MatIconButton } from "@angular/material/button";

@Component({
    selector: 'image-filter',
    templateUrl: './image-filter.component.html',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        AsyncPipe,
        MatIconButton,
    ],
    styleUrls: ['./image-filter.component.scss']
})
export class ImageFilterComponent implements OnInit {
    public allCategories: Category[] = [];
    public filteredCategories: Observable<Category[]>;

    @Input() public selectedCategories: Category[] = [];
    @Output() public filterChange: EventEmitter<void> = new EventEmitter();

    categoryCtrl = new FormControl<string | Category | null>('');
    @ViewChild('categoryInput') categoryInput: ElementRef;

    constructor(
        private categoryService: CategoryService,
    ) { }

    ngOnInit() {
        this.categoryService.getAll().subscribe((res) => {
            this.allCategories = res;

            this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
                startWith(null),
                map((category: Category | null) => this._filter(category)),
            )
        });
    }

    private _filter(value: string | Category | null): Category[] {
        const filterValue = value
            ? (typeof value === 'string' ? value : value.name).toLowerCase()
            : '';

        return this.allCategories.filter(category => {
            const matchesName = category.name.toLowerCase().includes(filterValue);
            const isAlreadySelected = this.selectedCategories.some(selected => selected.id === category.id);
            return matchesName && !isAlreadySelected;
        });
    }

    public selected(event) {
        this.selectedCategories.push(event.option.value);

        this.categoryCtrl.setValue(null);
        this.categoryInput.nativeElement.value = '';
        this.filterChange.emit();
    }

    public remove(category) {
        const index = this.selectedCategories.indexOf(category);
        if (index >= 0) {
            this.selectedCategories.splice(index, 1);
        }
        this.filterChange.emit();
    }

    clearAll(event) {
        if (event) {
            event.stopPropagation();
        }

        this.selectedCategories.splice(0, this.selectedCategories.length);
        this._resetInput();
        this.filterChange.emit();
    }

    private _resetInput() {
        this.categoryCtrl.setValue(null);
        if (this.categoryInput) {
            this.categoryInput.nativeElement.value = '';
        }
    }
}
