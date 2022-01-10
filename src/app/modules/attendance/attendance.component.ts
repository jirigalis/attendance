import { MemberService } from '../core/services/member.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import * as moment from 'moment';
import { AttendanceService } from '../core/services/attendance.service';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
    dataSource;
    loading = false;
    displayedColumns: string[] = ['name', 'role'];
    dateColumns = AttendanceComponent.generateDates();
    allColumns = [...this.displayedColumns, ...this.dateColumns];
    static WEEK_COUNT  = 10;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => {
            return result.matches;
        }),
        shareReplay()
    );

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private memberService: MemberService,
        private breakpointObserver: BreakpointObserver
    ) { }

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
