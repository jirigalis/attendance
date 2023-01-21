import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import * as moment from 'moment';
import { forkJoin, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { Member } from '../core/models';
import { AttendanceService } from '../core/services/attendance.service';
import { MemberService } from '../core/services/member.service';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
    dataSource;
    loading = false;
    displayedColumns: string[] = ['name'];
    allColumns;
    static WEEK_COUNT = 10;
    meetingDates = [];
    members: Member[];
    counter: number = 0;

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result) => {
                return result.matches;
            }),
            shareReplay()
        );

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private memberService: MemberService,
        private attendanceService: AttendanceService,
        private authService: AuthenticationService,
        private breakpointObserver: BreakpointObserver
    ) {}

    /* static generateDates() {
        const mondays = [];
        for (let i = 0; i < this.WEEK_COUNT; i++) {
            const monday = moment().day('Monday');
            mondays.push(monday.subtract(i, 'w').format('DD. MM. Y'));
        }
        return mondays.reverse();
    } */

    ngOnInit() {
        moment.locale('cs');
        this.loading = true;

        this._prepareData();
    }

    getTotalAttendance(column, element) {
        return column.reduce(
            (data, val) => (val[element] ? (data += 1) : data),
            0
        );
    }

    private _prepareData() {
        const dates$ = this.attendanceService.getAllDatesBySchoolyear(this.authService.getSchoolyear());
        const members$ = this.memberService.getAllWithAttendance(this.authService.getSchoolyear());

        forkJoin([dates$, members$]).subscribe((results) => {
            this.members = results[1];
            this.meetingDates = results[0].map((d) =>
                moment(d.date).format('DD. MM. YYYY')
            );
            this.allColumns = [...this.displayedColumns, ...this.meetingDates];

            const result = [];

            this.members.forEach((m) => {
                const finalMemberValue = {
                    id: m.id,
                    name: m.name + ' ' + m.surname,
                    role: m.role,
                };
                this.meetingDates.forEach((md) => {
                    if ((m.attendance as Array<any>).includes(md)) {
                        finalMemberValue[md] = true;
                        return;
                    }
                });
                result.push(finalMemberValue);
            });
            this.dataSource = new MatTableDataSource(result);
            this.dataSource.sort = this.sort;
            this.loading = false;
        });
    }
}
