import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Event } from '../../core/models/event';

@Component({
    selector: 'event-dialog',
    templateUrl: './event-dialog.component.html',
    styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {
    public event: Event = new Event();

    constructor(
        private dialogRef: MatDialogRef<EventDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { }

    ngOnInit(): void {
        this.event = this.data !== null ? this.data : new Event();
    }

    submit() {
        this.dialogRef.close(this.event);
    }

    cancel() {
        this.dialogRef.close(null);
    }

}
