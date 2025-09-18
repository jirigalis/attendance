import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from 'src/app/modules/core/services/category.service';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@Component({
    selector: 'image-filter',
    templateUrl: './image-filter.component.html',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
    ],
    styleUrls: ['./image-filter.component.scss']
})
export class ImageFilterComponent implements OnInit {
    public categories;
    @Input() public selectedCategories;
    @Output() public filterChange: EventEmitter<void> = new EventEmitter();
    categoryCtrl = new FormControl('');
    @ViewChild('categoryInput') categoryInput: ElementRef;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(
        private categoryService: CategoryService,
    ) { }

    ngOnInit() {
        this.categoryService.getAll().subscribe((res) => {
            this.categories = res;
        });
    }

    public onBlur() {
        this.blurInput();
    }

    public selected(event) {
        this.selectedCategories.push(event.option.value);
        this.categoryCtrl.setValue('');
        this.filterChange.emit();
    }

    public remove(category) {
        const index = this.selectedCategories.indexOf(category);
        if (index >= 0) {
            this.selectedCategories.splice(index, 1);
        }
        this.blurInput()
        this.filterChange.emit();
    }

    private blurInput() {
        setTimeout(() => {
            this.categoryCtrl.setValue('');
            this.categoryInput.nativeElement.blur();
        }, 10);
    }

}
