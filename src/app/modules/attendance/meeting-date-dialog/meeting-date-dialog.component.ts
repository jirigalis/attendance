import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { MeetingDate } from '../../core/models/meeting-date';
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'meeting-date-dialog',
    templateUrl: './meeting-date-dialog.component.html',
    styleUrls: ['./meeting-date-dialog.component.scss'],
    imports: [
        MatDialogModule,
        MatInputModule,
        MatDatepickerModule,
        FormsModule,
        MatButtonModule,
        FlexLayoutModule,
        MatIconModule,
    ],
})
export class MeetingDateDialogComponent implements OnInit {
    public meetingDate = new MeetingDate();

    constructor(
        private dialogRef: MatDialogRef<MeetingDateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) { }

    ngOnInit() {
        if (this.data) {
            this.meetingDate.id = this.data.id;
            this.meetingDate.date = moment(this.data.date, 'DD. MM. YYYY')
            this.meetingDate.description = this.data.description;
        }
    }

    submit() {
        this.dialogRef.close(this.meetingDate);
    }

    cancel() {
        this.dialogRef.close(null);
    }

}
