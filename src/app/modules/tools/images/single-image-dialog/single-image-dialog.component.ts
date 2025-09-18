import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Image } from 'src/app/modules/core/models/image';
import { ImagePath } from 'src/app/modules/core/models/image-path';
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
    selector: 'single-image-dialog',
    templateUrl: './single-image-dialog.component.html',
    styleUrls: ['./single-image-dialog.component.scss'],
    imports: [
        FormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatCheckboxModule,
    ]
})
export class SingleImageDialogComponent implements OnInit {
    imagePath: ImagePath = new ImagePath();
    image: Image;

    constructor(
        private dialogRef: MatDialogRef<SingleImageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { }

    ngOnInit() {
        if (this.data) {
            this.image = this.data.image;
            this.imagePath = this.data.imagePath;
        }
    }

    submit() {
        this.dialogRef.close(this.imagePath);
    }

    cancel() {
        this.dialogRef.close(null);
    }

}
