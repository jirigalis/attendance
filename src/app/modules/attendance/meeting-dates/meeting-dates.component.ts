import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { AttendanceService } from '../../core/services/attendance.service';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';

@Component({
    selector: 'meeting-dates',
    templateUrl: './meeting-dates.component.html',
    styleUrls: ['./meeting-dates.component.scss'],
})
export class MeetingDatesComponent implements OnInit {
    displayedColumns: string[] = ['id', 'date', 'actions'];
    selectedDate: any;
    loading = false;
    dataSource;

    constructor(
        private attendanceService: AttendanceService,
        private authService: AuthenticationService,
        private snack: MatSnackBar,
        private changeDetectorRefs: ChangeDetectorRef,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.getDates();
    }

    addMeetingDate() {
        if (this.selectedDate) {
            this.loading = true;
            this.attendanceService
                .addMeetingDate(this.selectedDate.format('YYYY-MM-DD'))
                .subscribe((res) => {
                    this.snack.open('Nové datum bylo přidáno', 'X', {
                        duration: 3000,
                    });
                    this.refresh();
                    this.loading = false;
                });
        }
    }

    deleteDate(dateId) {
        const dialogRef = this.dialog.open(BasicDialogComponent);
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.loading = true;
                this.attendanceService
                    .deleteMeetingDate(dateId)
                    .subscribe((res2) => {
                        this.snack.open('Datum bylo odstraněno', 'X', {
                            duration: 3000,
                        });
                        this.refresh();
                        this.loading = false;
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
