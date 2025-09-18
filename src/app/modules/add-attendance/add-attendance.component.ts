import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import moment from 'moment';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { MemberService } from '../core/services';
import { AttendanceService } from '../core/services/attendance.service';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { TransferListComponent } from "../shared/transfer-list/transfer-list.component";

@Component({
    selector: 'add-attendance',
    templateUrl: './add-attendance.component.html',
    styleUrls: ['./add-attendance.component.scss'],
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDatepickerModule,
        TransferListComponent,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class AddAttendanceComponent implements OnInit {
    date = new FormControl(new Date());
    members;
    selectedMembers = [];
    loading = false;
    listConfig = {
        getLabel: (s) => s.name + ' ' + s.surname,
        showCounter: true,
    }
    meetingAgenda: string = '';

    constructor(
        private membersService: MemberService,
        private attendanceService: AttendanceService,
        private authService: AuthenticationService,
        private snack: MatSnackBar,
        private r: Router,
    ) { }

    ngOnInit() {
        this.membersService.getAllBySchoolyear(this.authService.getSchoolyear()).subscribe(members => {
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
        this.loading = true;
        const memberIds = this.selectedMembers.map(m => m.id);
        const date = moment(this.date.value);

        this.attendanceService
            .addAttendance(date.format('YYYY-MM-DD'), { ids: memberIds, agenda: this.meetingAgenda })
            .subscribe(res => {
                this.snack.open('Attendance successfully saved.', 'X', {
                    duration: 3000
                });
                this.loading = false;
                // navigate to attendance list
                this.r.navigate(['/attendance']);

            });
    }

}
