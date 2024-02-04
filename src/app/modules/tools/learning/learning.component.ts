import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Category } from "../../core/models/category";
import { Image } from "../../core/models/image";
import { ImageService } from "../../core/services/image.service";
import { ImageDetailComponent } from "./image-detail/image-detail.component";

@Component({
    selector: "learning",
    templateUrl: "./learning.component.html",
})
export class LearningComponent implements OnInit {
    loading: boolean = false;
    categories: Category[] = [];
    images: Image[] = [];
    imagePaths: any[] = [];
    imagePathsOriginal: any[] = [];
    randomize: boolean = false;
    imageSize: number = 1;

    constructor(
        private imageService: ImageService,
        private dialog: MatDialog,
    ) { }

    ngOnInit() { }

    public loadImages() {
        const categoryIds = {
            categories: this.categories.map(category => category.id)
        }
        this.imageService.getByCategories(categoryIds).subscribe((res) => {
            this.imagePaths = [];
            this.images = res;
            this.images.forEach(image => {
                image.path.forEach(path => {
                    const newPath = {
                        ...path,
                        name: image.name.charAt(0).toUpperCase() + image.name.slice(1),
                    }
                    this.imagePaths.push(newPath);
                });
            });
            this.imagePathsOriginal = [...this.imagePaths];
        });
    }

    public shuffleImages() {
        if (this.randomize) {
            this.imagePaths.sort(() => Math.random() - 0.5);
        } else {
            this.imagePaths = [...this.imagePathsOriginal];
        }
    }

    public openImageDetailDialog(index: number) {
        this.dialog.open(ImageDetailComponent, {
            data: {
                selectedImage: index,
                allImages: this.imagePaths,
            },
            autoFocus: false,
            maxWidth: '98vw',
            width: '98vw',
            height: '98vh',
            maxHeight: '98vh',
        });

    }

}