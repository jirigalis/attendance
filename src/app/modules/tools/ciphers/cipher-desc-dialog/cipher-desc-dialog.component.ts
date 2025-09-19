import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'cipher-desc-dialog',
    templateUrl: './cipher-desc-dialog.component.html',
    imports: [
        MatDialogModule,
        FlexLayoutModule,
        MatButtonModule,
    ],
})
export class CipherDescDialogComponent {

    constructor(
        private dialogRef: MatDialogRef<CipherDescDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) { }

}
