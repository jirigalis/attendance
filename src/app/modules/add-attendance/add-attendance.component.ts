import { AttendanceService } from './../core/services/attendance.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MemberService } from '../core/services';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss']
})
export class AddAttendanceComponent implements OnInit {

  date = new FormControl(new Date());
  members;
  attendanceForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private membersService: MemberService,
      private attendanceService: AttendanceService,
      private snack: MatSnackBar
  ) {}

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

      this.attendanceService
          .addAttendance(date.format('YYYY-MM-DD'), memberIds)
          .subscribe(res => {
              this.snack.open('Attendance successfully saved.', 'X', {
                  duration: 3000
              });
              this.loading = false;
          });
  }

}
