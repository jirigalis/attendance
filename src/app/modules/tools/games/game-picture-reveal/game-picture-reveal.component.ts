import { Component, ElementRef, HostListener, OnInit, QueryList, signal, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ImageService } from 'src/app/modules/core/services/image.service';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSliderModule } from "@angular/material/slider";
import { FormsModule } from "@angular/forms";
import { MaximizeDirective } from "../../../shared/maximize.directive";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ImageFilterComponent } from "../../images/image-filter/image-filter.component";
import { Category } from "../../../core/models/category";
import { Image as CategoryImage } from "../../../core/models/image";
import { ImagePath } from "../../../core/models/image-path";

export interface GridDimensions {
    numRows: number;
    numCols: number;
}

export interface Dimensions {
    width: number;
    height: number;
}

@Component({
    selector: 'game-picture-reveal',
    templateUrl: './game-picture-reveal.component.html',
    styleUrls: ['./game-picture-reveal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatSliderModule,
        FormsModule,
        MaximizeDirective,
        MatTooltipModule,
        ImageFilterComponent,


    ]
})
export class GamePictureRevealComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('imgRef') imgRef: ElementRef;
    @ViewChild('gridRef') gridRef: ElementRef;
    @ViewChild('tileGrid') tileGrid: ElementRef;
    @ViewChildren('tile') tiles: QueryList<ElementRef>;
    fileAttr = 'Vybrat soubor';
    public tilesCount = 160;
    public gridDimensions: GridDimensions;
    public uploadedImage: string;
    public imgFile;
    public originalImageDimensions: Dimensions;
    public originalTileGridDimensions: Dimensions;
    public newImageDimensions: Dimensions;
    public initialGridDimensions: Dimensions;
    public fullscreen: boolean = false;
    public interval;
    public intervalSpeed: number = 5;
    private readonly INTERVAL_SPEEDS: number[] = [5, 4, 3, 2, 1, 0.75, 0.5, 0.3, 0.2, 0.1];
    private dismissedTiles = [];
    loading: boolean = false;

    filteredCategories: Category[] = [];
    categoryImages: CategoryImage[] = [];
    selectedCategoryImage: CategoryImage;
    usedImages: string[] = [];
    availableImages: ImagePath[] = [];
    originalImageCount: number = 0;
    selectedImage: CategoryImage;
    showImageName = signal(false);

    constructor(public tools: ToolsService, private imageService: ImageService) { }

    ngOnInit() {
        this.updateGridDimensions();
    }

    public uploadFileEvt(imgFile) {
        if (imgFile.target.files && imgFile.target.files[0]) {
            this.fileAttr = '';
            Array.from(imgFile.target.files).forEach((file: any) => {
                this.fileAttr += file.name;
            });

            const file = imgFile.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.imgFile = file;
                this.uploadedImage = reader.result as string;
                this.resetTiles();
            }
            reader.readAsDataURL(file);

            // Reset if duplicate image uploaded again
            this.fileInput.nativeElement.value = '';
        } else {
            this.fileAttr = 'Choose File';
        }
    }

    public onImageUpload(event: Event) {
        const imgEl = event.target as HTMLImageElement;

        // Safety guard
        if (!imgEl || imgEl.naturalWidth === 0 || imgEl.naturalHeight === 0) {
            return;
        }

        if (!this.originalTileGridDimensions) {
            this.originalTileGridDimensions = {
                width: this.tileGrid.nativeElement.offsetWidth,
                height: this.tileGrid.nativeElement.offsetHeight,
            };
        }

        this.originalImageDimensions = {
            width: imgEl.naturalWidth,
            height: imgEl.naturalHeight,
        };

        this.newImageDimensions = this.calculateNewImageDimensions();
        this.tileGrid.nativeElement.style.width = this.newImageDimensions.width + 'px';
        this.tileGrid.nativeElement.style.height = this.newImageDimensions.height + 'px';

        this.updateTiles();
        this.stopInterval();
    }


    public updateTiles() {
        if (!this.uploadedImage) {
            return;
        }
        this.updateGridDimensions();
        
        const tileWidth = this.newImageDimensions.width / this.gridDimensions.numCols;
        const tileHeight = this.newImageDimensions.height / this.gridDimensions.numRows;

        setTimeout(() => {
            this.tiles.forEach((t, index) => {
                const row = Math.floor(index / this.gridDimensions.numCols);
                const col = index % this.gridDimensions.numCols;

                t.nativeElement.style.width = tileWidth + 'px';
                t.nativeElement.style.height = tileHeight + 'px';
                t.nativeElement.style.top = (row * tileHeight) + 'px';
                t.nativeElement.style.left = (col * tileWidth) + 'px';
            })
        }, 0)
    }

    /**
     * Calculate optimal dimensions of tiles grid in pixels
     * @param tilesCount number of requested tiles
     * @returns dimensions of tiles grid
     */
    public calculateDimensions(tilesCount): GridDimensions {
        let i = Math.round(Math.sqrt(tilesCount + 0.5));
        while (tilesCount % i != 0) {
            i--;
        }
        return {
            numRows: i,
            numCols: tilesCount / i,
        };
    }

    public getCols() {
        return Array.from(Array(this.gridDimensions.numCols).keys());
    }

    public getRows() {
        return Array.from(Array(this.gridDimensions.numRows).keys());
    }

    /**
     * Update rows x cols in the grid.
     */
    private updateGridDimensions() {
        this.gridDimensions = this.calculateDimensions(this.tilesCount);
    }

    public calculateNewImageDimensions(): Dimensions {
        this.initialGridDimensions ??= this.originalTileGridDimensions;

        const gridRatio = this.initialGridDimensions.width / this.initialGridDimensions.height;
        const imageRatio = this.originalImageDimensions.width / this.originalImageDimensions.height;

        if (gridRatio > imageRatio) {
            // Grid is wider than image — fit to height
            const scale = this.initialGridDimensions.height / this.originalImageDimensions.height;
            return {
                width: this.originalImageDimensions.width * scale,
                height: this.initialGridDimensions.height
            };
        }

        // Grid is taller than image — fit to width
        const scale = this.initialGridDimensions.width / this.originalImageDimensions.width;
        return {
            width: this.initialGridDimensions.width,
            height: this.originalImageDimensions.height * scale
        };
    }

    public getPosition(row, col) {
        return row * this.gridDimensions.numCols + col + 1;
    }

    public dismiss(event) {
        event.target.classList.toggle('dismissed');
    }

    public resetTiles() {
        this.tiles.forEach(tile => {
            tile.nativeElement.classList.remove('dismissed')
        })
        this.dismissedTiles = [];
    }

    public restartPicture() {
        this.stopInterval();
        this.resetTiles();
    }

    public revealPicture() {
        this.tiles.forEach(tile => {
            tile.nativeElement.classList.add('dismissed');
        })
    }

    public dismissRandomTile() {
        // return if all tiles are dismissed
        if (this.dismissedTiles.length === this.tiles.length) {
            return;
        }

        let randomNumber = Math.floor(Math.random() * this.tiles.length);

        // check if tile is already dismissed
        while (this.dismissedTiles.includes(this.tiles.toArray()[randomNumber])) {
            randomNumber = Math.floor(Math.random() * this.tiles.length);
        }

        const randomTile = this.tiles.toArray()[randomNumber];
        randomTile.nativeElement.classList.add('dismissed');
        this.dismissedTiles.push(randomTile);

        if (this.dismissedTiles.length === this.tiles.length) {
            this.stopInterval();
        }
    }

    public startInterval() {
        if (!(this.uploadedImage)) {
            return;
        }

        const speed = this.INTERVAL_SPEEDS[this.intervalSpeed - 1] * 1000;

        this.interval = setInterval(() => {
            this.dismissRandomTile();
            // stop interval if all tiles are dismissed
            if (this.dismissedTiles.length === this.tiles.length) {
                clearInterval(this.interval);
            }
        }, speed );
    }

    public stopInterval() {
        clearInterval(this.interval);
        this.interval = null;
    }

    public updateIntervalSpeed() {
        if (!this.uploadedImage || !this.interval) {
            return;
        }
        this.stopInterval();
        this.startInterval();
    }

    get intervalSpeedLabel(): string {
        return `${this.INTERVAL_SPEEDS[this.intervalSpeed - 1] ?? 1}s`;
    }

    public onCategoryLoad(data) {
        if (this.filteredCategories.length === 0) {
            return;
        }
        // convert filteredCategories to array of ids
        const ids = {
            categories: this.filteredCategories.map(category => category.id)
        };
        this.loading = true;
        const api = this.filteredCategories.length > 0 ? this.imageService.getByCategories(ids) : this.imageService.getAll();
        api.subscribe((images: CategoryImage[]) => {
            this.categoryImages = images;
            this.availableImages = this.getAvailableImages();
            this.originalImageCount = this.availableImages.length;
            this.loading = false;
        });
    }

    public showNextCategoryImage(): void {
        this.availableImages = this.getAvailableImages();

        if (this.availableImages.length === 0) {
            this.resetImageHistory();
            this.availableImages = this.categoryImages.flatMap((item: CategoryImage) => item.path);
        }

        const selectedImage: ImagePath = this.pickRandom(this.availableImages);
        this.selectedCategoryImage = this.categoryImages.find((image: CategoryImage) => image.id === selectedImage.image_id);

        this.originalTileGridDimensions = undefined;
        this.uploadedImage = '/assets/images/' + selectedImage.path;
        this.usedImages.push(selectedImage.path);
        this.resetTiles();
    }

    private pickRandom<T>(items: T[]): T {
        return items[Math.floor(Math.random() * items.length)];
    }

    public resetImageHistory(): void {
        this.usedImages = [];
    }

    public getAvailableImages(): ImagePath[] {
        return this.categoryImages
            .flatMap((item: CategoryImage) => item.path)
            .filter((pathObj: ImagePath) => !this.usedImages.includes(pathObj.path));
    }

    get imageName(): string {
        return this.selectedCategoryImage.name;
    }

    @HostListener('window:keydown.space', ['$event'])
    public onSpacebarDown(event: KeyboardEvent): void {
        if (!this.uploadedImage) {
            return;
        }
        event.preventDefault();
        if (!this.showImageName()) {
            this.showImageName.set(true);
        }
    }

    @HostListener('window:keyup.space', ['$event'])
    public onSpacebarUp(event: KeyboardEvent): void {
        event.preventDefault();
        this.showImageName.set(false);
    }

    onHelpMouseDown(event: MouseEvent): void {
        event.preventDefault();
        this.showImageName.set(true);
    }

    onHelpTouchStart(event: TouchEvent): void {
        event.preventDefault();
        this.showImageName.set(true);}

    onHelpMouseUp(): void {
        this.showImageName.set(false);
    }
}
