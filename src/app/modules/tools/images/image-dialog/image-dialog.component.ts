import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Image } from 'src/app/modules/core/models/image';
import { CategoryService } from 'src/app/modules/core/services/category.service';

@Component({
    selector: 'image-dialog',
    templateUrl: './image-dialog.component.html',
})
export class ImageDialogComponent implements OnInit {
    image = new Image();
    categories = [];

    constructor(
        private dialogRef: MatDialogRef<ImageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private categoryService: CategoryService,
    ) { }

    ngOnInit() {
        this.image = this.data !== null ? this.data : new Image();
        this.categoryService.getAll().subscribe((categories) => {
            this.categories = categories;
        });
    }

    submit() {
        this.dialogRef.close(this.image);
    }

    cancel() {
        this.dialogRef.close(null);
    }

}
