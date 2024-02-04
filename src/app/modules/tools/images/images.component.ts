import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../../core/models/category';
import { CategoryService } from '../../core/services/category.service';
import { ImageService } from '../../core/services/image.service';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { ManageCategoriesDialogComponent } from './manage-categories-dialog/manage-categories-dialog.component';
import { SingleImageDialogComponent } from './single-image-dialog/single-image-dialog.component';

@Component({
    selector: 'images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ImagesComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'category', 'checkout', 'actions'];
    displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
    loading = false;
    dataSource;
    epxandedElement: any;
    filterCategories: any[] = [];
    allCategories: Category[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) public sort: MatSort;

    constructor(
        private imageService: ImageService,
        private categoryService: CategoryService,
        private snack: MatSnackBar,
        private cd: ChangeDetectorRef,
        private dialog: MatDialog,
    ) { }

    ngOnInit() {
        this.loading = true;
        this.categoryService.getAll().subscribe((res) => {
            this.allCategories = res;
            this.refresh();
        });
        this.refresh();
    }

    public shouldBeReviewed(image) {
        return image.path.some(path => path.review === 1);
    }

    public getCategoryName(categoryId) {
        return this.allCategories.find(category => category.id === categoryId).name;
    }

    public addImage() {
        const dialogRef = this.dialog.open(ImageDialogComponent);

        dialogRef.afterClosed().subscribe((image) => {
            if (image) {
                this.loading = true;
                this.imageService.create(image).subscribe((res) => {
                    this.snack.open('Obrázek vytvořen', 'X', { duration: 3000 });
                    this.refresh();
                    this.loading = false;
                });
            }
        });
    }

    public editImage(image) {
        const dialogRef = this.dialog.open(ImageDialogComponent, {
            data: image,
        });
        dialogRef.afterClosed().subscribe((image) => {
            if (image) {
                this.loading = true;
                this.imageService.update(image).subscribe((res) => {
                    this.snack.open('Obrázek byl aktualizován', 'X', {
                        duration: 3000,
                    });
                    this.refresh();
                    this.loading = false;
                });
            }
        });
    }

    public manageCategories() {
        const dialogRef = this.dialog.open(ManageCategoriesDialogComponent, { width: '95%' });

        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.refresh();
            }
        });
    }

    public openPathDialog(imagePath, image) {
        const dialogRef = this.dialog.open(SingleImageDialogComponent, { width: '66%', data: { imagePath, image} });

        dialogRef.afterClosed().subscribe((imagePath) => {
            if (imagePath) {
                this.loading = true;
                this.imageService.updatePath(image.id, imagePath).subscribe((res) => {
                    this.snack.open('Obrázek byl aktualizován', 'X', {
                        duration: 3000,
                    });
                    this.refresh();
                    this.loading = false;
                });
            }
        });
    }

    public refresh() {
        // convert filterCategories to array of ids
        const ids = {
            categories: this.filterCategories.map(category => category.id)
        };
        this.loading = true;
        const api = this.filterCategories.length > 0 ? this.imageService.getByCategories(ids) : this.imageService.getAll();
        api.subscribe(images => {
            this.dataSource = new MatTableDataSource(images);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.loading = false;
        });
    }
}
