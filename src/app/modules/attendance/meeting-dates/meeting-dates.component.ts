import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { MeetingDate } from '../../core/models/meeting-date';
import { AttendanceService } from '../../core/services/attendance.service';
import { SnackService } from '../../core/services/snack.service';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';
import { MeetingDateDialogComponent } from '../meeting-date-dialog/meeting-date-dialog.component';

@Component({
    selector: 'meeting-dates',
    templateUrl: './meeting-dates.component.html',
    styleUrls: ['./meeting-dates.component.scss'],
})
export class MeetingDatesComponent implements OnInit {
    displayedColumns: string[] = ['id', 'date', 'description', 'actions'];
    loading = false;
    dataSource;

    constructor(
        private attendanceService: AttendanceService,
        private authService: AuthenticationService,
        private snack: SnackService,
        private changeDetectorRefs: ChangeDetectorRef,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.loading = true;
        this.getDates();
    }

    addMeeting() {
        const dialogRef = this.dialog.open(MeetingDateDialogComponent, { width: '400px' });
        dialogRef.afterClosed().subscribe((meetingDate: MeetingDate) => {
            if (meetingDate) {
                this.loading = true;
                this.attendanceService.addMeetingDate(meetingDate.date.format('YYYY-MM-DD'), meetingDate.description)
                    .subscribe(_ => {
                        this.snack.open('Schůzka vytvořena');
                        this.refresh();
                        this.loading = false;
                    });
            }
        });
    }

    editMeeting(meeting) {
        const dialogRef = this.dialog.open(MeetingDateDialogComponent, { data: meeting, width: '400px' });
        dialogRef.afterClosed().subscribe(md => {
            if (md) {
                this.loading = true;
                md.date = md.date.format('YYYY-MM-DD');
                this.attendanceService.editMeetingDate(md)
                    .subscribe(_ => {
                        this.snack.open('Schůzka úspěšně upravena.');
                        this.loading = false;
                        this.refresh();
                    })
            }
        });
    }

    deleteMeeting(dateId) {
        const dialogRef = this.dialog.open(BasicDialogComponent);
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.loading = true;
                this.attendanceService
                    .deleteMeetingDate(dateId)
                    .subscribe((_) => {
                        this.snack.open('Schůzka byla odstraněna');
                        this.loading = false;
                        this.refresh();
                    });
            }
        });
    }

    private refresh() {
        this.getDates();
        this.changeDetectorRefs.detectChanges();
    }

    private getDates() {
        this.attendanceService.getAllDatesBySchoolyear(this.authService.getSchoolyear()).subscribe((dates: any) => {
            dates.map(
                (d) =>
                (d.date = moment(d.date, 'YYYY-MM-DD hh:mm:ss').format(
                    'DD. MM. YYYY'
                ))
            );
            this.dataSource = new MatTableDataSource(dates);
            this.loading = false;
        });
    }
}
