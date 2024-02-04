import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CategoryService } from 'src/app/modules/core/services/category.service';

@Component({
    selector: 'image-filter',
    templateUrl: './image-filter.component.html',
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
