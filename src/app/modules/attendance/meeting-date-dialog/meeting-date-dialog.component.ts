import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { MeetingDate } from '../../core/models/meeting-date';

@Component({
    selector: 'meeting-date-dialog',
    templateUrl: './meeting-date-dialog.component.html',
    styleUrls: ['./meeting-date-dialog.component.scss']
})
export class MeetingDateDialogComponent implements OnInit {
    public meetingDate = new MeetingDate();

    constructor(
        private dialogRef: MatDialogRef<MeetingDateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) { }

    ngOnInit() {
        console.log(this.data);
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
