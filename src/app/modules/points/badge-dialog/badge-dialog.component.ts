import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Badge } from '../../core/models/badge';

@Component({
    selector: 'badge-dialog',
    templateUrl: './badge-dialog.component.html',
    styleUrls: ['./badge-dialog.component.scss']
})
export class BadgeDialogComponent implements OnInit {
    badge = new Badge();

    constructor(
        private dialogRef: MatDialogRef<BadgeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
        ) { }

    ngOnInit(): void {
        this.badge = this.data !== null ? this.data : new Badge();
    }

    submit() {
        this.dialogRef.close(this.badge);
    }

    cancel() {
        this.dialogRef.close(null);
    }

}
