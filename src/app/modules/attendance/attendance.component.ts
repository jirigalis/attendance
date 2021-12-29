import { MemberService } from '../core/services/member.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import * as moment from 'moment';
import { AttendanceService } from '../core/services/attendance.service';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
    constructor(
        private memberService: MemberService,
        private attendanceService: AttendanceService
    ) {}
    dataSource;
    loading = false;
    displayedColumns: string[] = ['name', 'role'];
    dateColumns = AttendanceComponent.generateDates();
    allColumns = [...this.displayedColumns, ...this.dateColumns];
    static WEEK_COUNT  = 10;

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    static generateDates() {
        const mondays = [];
        for (let i = 0; i < this.WEEK_COUNT; i++) {
            const monday = moment().day("Monday");
            mondays.push(monday.subtract(i, 'w').format('D. M. Y'));
        }
        return mondays.reverse();
    }

    ngOnInit() {
        moment.locale('cs');
        this.loading = true;

        this.memberService.getAllWithAttendance().subscribe(data => {
            this._parseMembers(data);
            this.loading = false;
            this.dataSource.sort = this.sort;
        });
    }

    getTotalAttendance(column, element) {
        return column.reduce((data, val) => val[element] ? data += 1 : data, 0);        
    }

    private _parseMembers(data) {
        const result = [];

        data.forEach(val => {
            const finalValue = {
                name: val.name + ' ' + val.surname,
                role: val.role
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
