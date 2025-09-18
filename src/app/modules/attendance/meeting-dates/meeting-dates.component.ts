import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import moment from 'moment';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { MeetingDate } from '../../core/models/meeting-date';
import { AttendanceService } from '../../core/services/attendance.service';
import { SchoolyearService } from '../../core/services/schoolyear.service';
import { SnackService } from '../../core/services/snack.service';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';
import { MeetingDateDialogComponent } from '../meeting-date-dialog/meeting-date-dialog.component';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
    selector: 'meeting-dates',
    templateUrl: './meeting-dates.component.html',
    styleUrls: ['./meeting-dates.component.scss'],
    imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatProgressBarModule,
        FormsModule,
        MatTooltipModule,
    ]
})
export class MeetingDatesComponent implements OnInit {
    displayedColumns: string[] = ['id', 'date', 'length', 'description', 'actions', 'sign'];
    loading = false;
    dataSource;
    public printMe = false;

    public minDate;
    public maxDate;

    constructor(
        private attendanceService: AttendanceService,
        private authService: AuthenticationService,
        private schoolyearService: SchoolyearService,
        private snack: SnackService,
        private changeDetectorRefs: ChangeDetectorRef,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getDates();
        this.loadSchoolyear();
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

    public printMeetings() {
        this.printMe = true;
        setTimeout(() => {
            window.print();
            this.printMe = false;
        }, 1000)
    }

    private refresh() {
        this.getDates();
        this.changeDetectorRefs.detectChanges();
    }

    private loadSchoolyear() {
        this.schoolyearService.getById(this.authService.getSchoolyear()).subscribe(sy => {
            this.minDate = sy.startDate;
            this.maxDate = sy.endDate;
        })
    }

    public getDates() {
        this.loading = true;
        this.attendanceService.getAllDatesBySchoolyear(this.authService.getSchoolyear()).subscribe((dates: any) => {
            if (this.minDate) {
                dates = dates.filter((d: any) => moment(d.date).isSameOrAfter(this.minDate));
            }
            if (this.maxDate) {
                dates = dates.filter((d: any) => moment(d.date).isSameOrBefore(this.maxDate));
            }

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
