import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { Event } from '../../core/models/event';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'event-dialog',
    templateUrl: './event-dialog.component.html',
    imports: [
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatDatepickerModule,
        FormsModule,
        MatIconModule,
    ],
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
