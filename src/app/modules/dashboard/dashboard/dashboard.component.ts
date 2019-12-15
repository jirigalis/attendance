import { MemberService } from './../../core/services/member.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import * as moment from 'moment';
import {AttendanceService} from '../../core/services/attendance.service';
import {flatMap, map, mergeAll, mergeMap, switchMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private memberService: MemberService,
    private attendanceService: AttendanceService
  ) { }
  members;
  dataSource;
  loading = false;
  displayedColumns: string[] = ['name'];
  date;

  static generateDates() {
    const fridays = [];
    for (let i = 0; i < 10; i++) {
      const friday = moment().day(moment().day() >= 5 ? 5 : -2);

      fridays.push(friday.subtract(i, 'w').format('D. M. Y'));
    }
    return fridays;
  }

  ngOnInit() {
    moment.locale('cs');
    this.loading = true;
    this.displayedColumns.push(...DashboardComponent.generateDates());

    this.memberService.getAll().pipe(
      switchMap(members => forkJoin(members.map(row => this.memberService.getAttendanceById(row.id)))),
    ).subscribe(fullData => {
      console.log(fullData);
      this.loading = false;
    });

  }

  test() {
    console.log('test');
    this.memberService.getAll().pipe(
      flatMap((res1) => this.memberService.getAttendanceById(res1.id))
    ).subscribe((res3) => {
        console.log(res3);
    });
  }

}
