import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'cipher-desc-dialog',
    templateUrl: './cipher-desc-dialog.component.html',
})
export class CipherDescDialogComponent {

    constructor(
        private dialogRef: MatDialogRef<CipherDescDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) { }

}
