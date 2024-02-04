import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'image-detail',
    templateUrl: './image-detail.component.html',
    styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
    public selectedImage;
    public index;
    public showImageName: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private dialogRef: MatDialogRef<ImageDetailComponent>,
    ) { }

    ngOnInit() {
        this.index = this.data.selectedImage;
        this.selectedImage = this.data.allImages[this.index];
    }

    private previousImage() {
        this.index = this.index === 0 ? this.data.allImages.length - 1 : this.index - 1;
        this.selectedImage = this.data.allImages[this.index];
    }

    private nextImage() {
        this.index = this.index === this.data.allImages.length - 1 ? 0 : this.index + 1;
        this.selectedImage = this.data.allImages[this.index];
    }

    @HostListener('document:keydown', ['$event'])
    public handleKeydown(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            this.previousImage();
        } else if (event.key === 'ArrowRight') {
            this.nextImage();
        } else if (event.key === ' ') {
            this.showImageName = true;
            event.preventDefault();
        }
    }

    @HostListener('document:keyup', ['$event'])
    public handleKeyup(event: KeyboardEvent) {
        if (event.key === ' ') {
            this.showImageName = false
        }
    }

    public closeDialog() {
        this.dialogRef.close();
    }

}
