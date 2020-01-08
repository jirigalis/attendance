import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MemberService } from '../core/services';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
    date = new FormControl(new Date());
    members;

    constructor(private membersService: MemberService) {}

    ngOnInit() {
        this.membersService.getAll().subscribe(members => {
            this.members = members;
        });
    }

    selectMember(el) {
        console.log(el);
    }
}
