import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Reason } from '../../core/models/reason';

@Component({
    selector: 'add-reason',
    templateUrl: './add-reason.component.html',
    styleUrls: ['./add-reason.component.scss']
})
export class AddReasonComponent implements OnInit {
    reason = new Reason();

    constructor(
        private dialogRef: MatDialogRef<AddReasonComponent>,
        @Inject(MAT_DIALOG_DATA) public data
        ) { }

    ngOnInit(): void {
        this.reason = this.data !== null ? this.data : new Reason();
    }

    submit() {
        this.dialogRef.close(this.reason);
    }

    cancel() {
        this.dialogRef.close(null);
    }

}
