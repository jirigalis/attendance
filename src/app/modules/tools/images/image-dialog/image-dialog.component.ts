import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Image } from 'src/app/modules/core/models/image';
import { CategoryService } from 'src/app/modules/core/services/category.service';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { Category } from "../../../core/models/category";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { SnackService } from "../../../core/services/snack.service";

@Component({
    selector: 'image-dialog',
    templateUrl: './image-dialog.component.html',
    styleUrls: ['./image-dialog.component.scss'],
    imports: [
        FlexLayoutModule,
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
        AsyncPipe,
    ]
})
export class ImageDialogComponent implements OnInit {
    private categoryService = inject(CategoryService);
    private snack: SnackService = inject(SnackService);

    image = signal<Image | undefined>(undefined);
    categories$: Observable<Category[]> = this.categoryService.getAll();
    filesToUpload = new Map<number, File>();

    constructor(
        private dialogRef: MatDialogRef<ImageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Image,
    ) { }

    ngOnInit() {
        this.image.set(this.data);
    }

    triggerFileInput(pathId: number) {
        const fileInput = document.getElementById(`file-input-${pathId}`) as HTMLInputElement;
        fileInput.click();
    }

    onFileSelected(event: Event, pathId: number, pathIndex: number) {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files.length > 0) {
            const file = input.files[0];

            // Validate file type
            if (!file.type.startsWith("image")) {
                this.snack.error('Prosím vyberte obrázek');
                return;
            }

            this.filesToUpload.set(pathId, file);

            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const currentImage = this.image();
                if (currentImage && currentImage.path[pathIndex]) {
                    const updatedPath = [...currentImage.path];
                    updatedPath[pathIndex] = {
                        ...updatedPath[pathIndex],
                        path: e.target?.result as string,
                    };

                    this.image.set({
                        ...currentImage,
                        path: updatedPath,
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    }

    submit() {
        const result = {
            image: this.image(),
            filesToUpload: this.filesToUpload,
        }
        this.dialogRef.close(result);
    }

    cancel() {
        this.dialogRef.close(null);
    }

}
