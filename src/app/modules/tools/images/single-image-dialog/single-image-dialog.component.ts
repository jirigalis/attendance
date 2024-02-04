import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Image } from 'src/app/modules/core/models/image';
import { ImagePath } from 'src/app/modules/core/models/image-path';
import { ImageService } from 'src/app/modules/core/services/image.service';

@Component({
    selector: 'single-image-dialog',
    templateUrl: './single-image-dialog.component.html',
    styleUrls: ['./single-image-dialog.component.scss'],
})
export class SingleImageDialogComponent implements OnInit {
    imagePath: ImagePath = new ImagePath();
    image: Image;

    constructor(
        private dialogRef: MatDialogRef<SingleImageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private imageService: ImageService,
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
