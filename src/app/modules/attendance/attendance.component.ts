import { AttendanceService } from './../core/services/attendance.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MemberService } from '../core/services';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
    date = new FormControl(new Date());
    members;
    attendanceForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(private membersService: MemberService, private attendanceService: AttendanceService) {}

    ngOnInit() {
        this.membersService.getAll().subscribe(members => {
            this.members = members;
        });
    }

    selectMember(el) {
        el.selected = !el.selected;
        const arr = this.members;
        arr.sort((a, b) => {
            if (a.selected) {
                return 1;
            }
            if (!a.selected && b.selected) {
                return -1;
            }
            return 0;
        });
    }

    onSubmit() {
        this.submitted = true;
        this.loading = true;

        const memberIds = [];
        this.members.map(m => {
            if (m.selected) {
                memberIds.push(m.id);
            }
        });

        const date = moment(this.date.value);
        console.log(date.format('YYYY-MM-DD'));

        this.attendanceService.addAttendance(date.format('YYYY-MM-DD'), memberIds).subscribe(res => {
            console.log(res);
            this.loading = false;
        });
    }
}
