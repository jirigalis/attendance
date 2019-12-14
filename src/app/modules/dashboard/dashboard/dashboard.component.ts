import { MemberService } from './../../core/services/member.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  members: any;
  dataSource;
  loading = false;
  displayedColumns: string[] = ['name', ''];

  constructor(
    private memberService: MemberService
  ) { }

  ngOnInit() {
  }

  test() {
    this.memberService.getAll().subscribe(res => {
      console.log(res);
    })
  }

  generateDates() {
    
  }

}
