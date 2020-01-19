import { MemberService } from './../../core/services/member.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import * as moment from 'moment';
import { AttendanceService } from '../../core/services/attendance.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    constructor(
        private memberService: MemberService,
        private attendanceService: AttendanceService
    ) {}
    dataSource;
    loading = false;
    displayedColumns: string[] = ['name'];
    dateColumns = DashboardComponent.generateDates();
    allColumns = [...this.displayedColumns, ...this.dateColumns];

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    static generateDates() {
        const mondays = [];
        for (let i = 0; i < 10; i++) {
            const friday = moment().day(moment().day() >= 1 ? 1 : -2);
            mondays.push(friday.subtract(i, 'w').format('D. M. Y'));
        }
        return mondays.reverse();
    }

    ngOnInit() {
        console.log('Init dashboard');
        moment.locale('cs');
        this.loading = true;

        this.memberService.getAllWithAttendance().subscribe(data => {
            this._parseMembers(data);
            this.loading = false;
            this.dataSource.sort = this.sort;
        });
    }

    private _parseMembers(data) {
        const result = [];

        data.forEach(val => {
            const finalValue = {
                name: val.name + ' ' + val.surname
            };

            this.dateColumns.forEach(col => {
                finalValue[col] = false;
                val.attendance.forEach(a => {
                    if (moment(a).isSame(moment(col, 'DD. MM. YYYY'))) {
                        finalValue[col] = true;
                        return;
                    }
                });
            });

            result.push(finalValue);
        });
        this.dataSource = new MatTableDataSource(result);
    }
}
