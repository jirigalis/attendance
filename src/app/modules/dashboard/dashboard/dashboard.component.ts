import { MemberService } from './../../core/services/member.service';
import { Component, OnInit } from '@angular/core';
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
    membersLoading = false;

    ngOnInit() {
        moment.locale('cs');
        this.membersLoading = true;

        this.memberService.getAllWithAttendance().subscribe(data => {
            this._parseMembers(data);
            this.membersLoading = false;
        });
    }

    private _parseMembers(data) {
        const result = [];

        data.forEach(val => {
            const finalValue = {
                name: val.name + ' ' + val.surname,
                role: val.role
            };

            result.push(finalValue);
        });
    }
}
