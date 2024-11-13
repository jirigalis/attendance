import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ImageService } from 'src/app/modules/core/services/image.service';
import { ToolsService } from 'src/app/modules/core/services/tools.service';

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
})
export class GamePictureRevealComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('imgRef') imgRef: ElementRef;
    @ViewChild('tileGrid') tileGrid: ElementRef;
    @ViewChildren('tile') tiles: QueryList<ElementRef>;
    fileAttr = 'Choose File';
    public tilesCount = 18;
    public gridDimensions: GridDimensions;
    public uploadedImage;
    public imgFile;
    public originalImageDimensions: Dimensions;
    public originalTileGridDimensions: Dimensions;
    public newImageDimensions: Dimensions;
    public gridContainerDimensions: Dimensions;
    public positionSum: number = 0;
    public interval;
    private dismissedTiles = [];
    filterCategories: any[] = [];
    loading: boolean = false;

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
        const img = new Image();
        img.src = this.imgRef.nativeElement.src;
        img.onload = () => {
            // save original tile grid dimensions
            if (!this.originalTileGridDimensions) {
                this.originalTileGridDimensions = {
                    width: this.tileGrid.nativeElement.offsetWidth,
                    height: this.tileGrid.nativeElement.offsetHeight,
                }
            }
            
            // adjust grid-container
            this.saveOriginalImageDimensions();
            this.newImageDimensions = this.calculateNewImageDimensions();
            this.tileGrid.nativeElement.style.width = this.newImageDimensions.width + 'px';
            this.tileGrid.nativeElement.style.height = this.newImageDimensions.height + 'px';
            this.updateTiles();
        }
    }


    public updateTiles() {
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

    private saveOriginalImageDimensions() {
        if (this.imgRef) {
            this.originalImageDimensions = {
                width: this.imgRef.nativeElement.naturalWidth,
                height: this.imgRef.nativeElement.naturalHeight,
            };
        }
    }

    public calculateNewImageDimensions(): Dimensions {
        const gridRatio = this.originalTileGridDimensions.width / this.originalTileGridDimensions.height;
        const imageRatio = this.originalImageDimensions.width / this.originalImageDimensions.height;
        const newTileGridDimensions = {
            width: this.tileGrid.nativeElement.offsetWidth,
            height: this.tileGrid.nativeElement.offsetHeight
        };

        if (gridRatio > imageRatio) {
            // the grid is wider than image - height of the image and grid is equal
            const resizeRatio = this.originalImageDimensions.height / this.tileGrid.nativeElement.offsetHeight;
            const newWidth = this.originalImageDimensions.width / resizeRatio;
            newTileGridDimensions.width = newWidth;

        } else {
            // the grid is higher than image - width of the image and grid is equal
            const resizeRatio = this.originalImageDimensions.width / this.tileGrid.nativeElement.offsetWidth;
            const newHeight = this.originalImageDimensions.height / resizeRatio;
            newTileGridDimensions.height = newHeight;
        }
        return newTileGridDimensions;
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
    }

    public dismissInInterval() {
        this.interval = setInterval(() => {
            this.dismissRandomTile();
            // stop interval if all tiles are dismissed
            if (this.dismissedTiles.length === this.tiles.length) {
                clearInterval(this.interval);
            }
        }, 1000);
    }

    public stopInterval() {
        clearInterval(this.interval);
        this.interval = null;
    }

    public refresh() {
        // convert filterCategories to array of ids
        const ids = {
            categories: this.filterCategories.map(category => category.id)
        };
        this.loading = true;
        const api = this.filterCategories.length > 0 ? this.imageService.getByCategories(ids) : this.imageService.getAll();
        api.subscribe(images => {
            console.log(images);
            this.loading = false;
        });
    }
}
