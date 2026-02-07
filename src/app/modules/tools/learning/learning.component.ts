import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Category } from "../../core/models/category";
import { Image } from "../../core/models/image";
import { ImageService } from "../../core/services/image.service";
import { ImageDetailComponent } from "./image-detail/image-detail.component";
import { ImageFilterComponent } from "../images/image-filter/image-filter.component";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatButton } from "@angular/material/button";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { FormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SnackService } from "../../core/services/snack.service";
import { BehaviorSubject, combineLatest, EMPTY, Observable, of, startWith, Subject, switchMap, tap } from "rxjs";
import { catchError, map, shareReplay } from "rxjs/operators";
import { AsyncPipe } from "@angular/common";

interface ImageViewModel {
    id: number;
    path: string;
    name: string;
    originalIndex: number;
}

@Component({
    selector: "learning",
    templateUrl: "./learning.component.html",
    imports: [
        ImageFilterComponent,
        MatCheckbox,
        MatButton,
        FlexLayoutModule,
        FormsModule,
        MatSliderModule,
        MatProgressSpinnerModule,
        AsyncPipe,
    ]
})
export class LearningComponent {
    public categories: Category[] = [];
    public imageSize: number = 5;

    private loadTrigger$ = new Subject<void>();
    public randomize$ = new BehaviorSubject<boolean>(true);
    public loading: boolean = false;

    public rawImages$: Observable<ImageViewModel[]>;
    public displayImages$: Observable<ImageViewModel[]>;


    images: Image[] = [];
    imagePaths: any[] = [];

    constructor(
        private imageService: ImageService,
        private dialog: MatDialog,
        private snack: SnackService,
    ) {
        // Data loading
        this.rawImages$ = this.loadTrigger$.pipe(
            tap(() => {
                if (this.categories.length === 0) {
                    this.snack.open('Vyberte alespoň jednu kategorii.')
                }
            }),
            switchMap(() => {
                if (this.categories.length === 0) {
                    return EMPTY;
                }

                this.loading = true;

                const categoryIds = {
                    categories: this.categories.map(c => c.id),
                }

                return this.imageService.getByCategories(categoryIds).pipe(
                    map(res => this._transformImages(res)),
                    catchError(err => {
                        this.snack.open('Nepodařilo se načíst obrázky');
                        return of([]);
                    }),
                    tap(() => this.loading = false),
                );
            }),
            shareReplay(1),
        );

        // Image Displaying (shuffling)
        this.displayImages$ = combineLatest([
            this.rawImages$.pipe(startWith([])),
            this.randomize$,
        ]).pipe(
            map(([images, randomize]) => {
                if (!images || images.length === 0) {
                    return [];
                }
                return randomize ? this._shuffleArray([...images]) : images
            })
        );
    }

    public loadImages() {
        this.loadTrigger$.next();
    }

    public toggleRandomize(value: boolean): void {
        this.randomize$.next(value);
    }

    public openImageDetailDialog(selectedImageItem: ImageViewModel, currentList: ImageViewModel[]): void {
        const index = currentList.indexOf(selectedImageItem);

        this.dialog.open(ImageDetailComponent, {
            data: {
                selectedImage: index,
                allImages: currentList,
            },
            autoFocus: false,
            maxWidth: '96vw',
            width: '96vw',
            height: '94vh',
            maxHeight: '94vh',
        });
    }

    private _transformImages(res) {
        const flattened: ImageViewModel[] = [];
        let globalIndex = 0;

        res.forEach(imageGroup => {
            if (imageGroup.path && Array.isArray(imageGroup.path)) {
                imageGroup.path.forEach(pathItem => {
                    flattened.push({
                        id: pathItem.id || globalIndex++,
                        path: pathItem.path || pathItem,
                        name: this._formatName(imageGroup.name),
                        originalIndex: globalIndex,
                    });
                });
            }
        });

        return flattened;
    }

    private _formatName(name: string) {
        if (!name) {
            return '';
        }

        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    private _shuffleArray(array: any[]): any[] {
        // Fisher-Yates shuffle
        for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}