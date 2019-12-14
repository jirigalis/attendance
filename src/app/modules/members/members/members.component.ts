import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from '../../core/services';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  members: any;
  dataSource;
  loading = false;

  displayedColumns: string[] = ['name', 'surname', 'address', 'contact'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.memberService.getAll().subscribe(members => {
      this.dataSource = new MatTableDataSource(members.data);
      this.loading = false;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
