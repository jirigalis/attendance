import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Image } from 'src/app/modules/core/models/image';
import { CategoryService } from 'src/app/modules/core/services/category.service';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";

@Component({
    selector: 'image-dialog',
    templateUrl: './image-dialog.component.html',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatFormField,
        MatLabel,
        MatSelectModule,
        FormsModule,
        MatDialogActions,
        MatButton,
        MatIconModule,
        MatInput,
    ]
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
