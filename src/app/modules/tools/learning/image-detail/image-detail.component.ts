import { Component, HostListener, Inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatMiniFabButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'image-detail',
    templateUrl: './image-detail.component.html',
    imports: [
        MatMiniFabButton,
        MatDialogContent,
        MatIconModule,
    ],
    styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
    public selectedImage;
    public index: number;
    public showImageName = signal(false);

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private dialogRef: MatDialogRef<ImageDetailComponent>,
    ) { }

    ngOnInit() {
        this.index = this.data.selectedImage;
        this.selectedImage = this.data.allImages[this.index];
    }

    public previousImage() {
        this.index = this.index === 0 ? this.data.allImages.length - 1 : this.index - 1;
        this.selectedImage = this.data.allImages[this.index];
    }

    public nextImage() {
        this.index = this.index === this.data.allImages.length - 1 ? 0 : this.index + 1;
        this.selectedImage = this.data.allImages[this.index];
    }

    @HostListener('document:keydown', ['$event'])
    public handleKeydown(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            this.previousImage();
        } else if (event.key === 'ArrowRight') {
            this.nextImage();
        }
    }

    @HostListener('window:keydown.space', ['$event'])
    public onSpacebarDown(event: KeyboardEvent) {
        event.preventDefault();
        this.showImageName.set(true);
    }

    @HostListener('window:keyup.space', ['$event'])
    public onSpacebarUp(event: KeyboardEvent) {
        event.preventDefault();
        this.showImageName.set(false);
    }

    public startShowingName(event: Event) {
        if (event.cancelable) {
            event.preventDefault();
        }
        this.showImageName.set(true);
    }

    public stopShowingName(event: Event) {
        this.showImageName.set(false);
    }

    public closeDialog() {
        this.dialogRef.close();
    }

}
