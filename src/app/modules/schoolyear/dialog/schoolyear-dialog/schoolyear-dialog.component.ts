import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
    selector: 'schoolyear-dialog',
    templateUrl: './schoolyear-dialog.component.html',
})
export class SchoolyearDialogComponent implements OnInit {
    public schoolyear: any = {
        id: null,
        label: null,
    };

    constructor(
        private dialogRef: MatDialogRef<SchoolyearDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { }

    public ngOnInit(): void {
        if (this.data) {
            this.schoolyear = this.data;
        }
    }

    public cancel() {
        this.dialogRef.close(null);
    }

    public submit() {
        this.dialogRef.close(this.schoolyear);
    }

}
