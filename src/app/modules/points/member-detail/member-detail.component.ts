import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../core/models';
import { MemberService } from '../../core/services';
import { PointsService } from '../../core/services/points.service';

@Component({
    selector: 'member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit {
    member?: Member;
    displayedColumns: string[] = ['reason', 'points', 'date'];
    badgesColumns: string[] = ['badge', 'logo', 'date'];
    dataSource: MatTableDataSource<any>;
    badgesDataSource: MatTableDataSource<any>;
    @ViewChild(MatSort) sort: MatSort;
    loading = false;
    constructor(
        private memberService: MemberService,
        private pointsService: PointsService,
        private route: ActivatedRoute,
        @Inject(LOCALE_ID) public locale: string
    ) {}

    ngOnInit(): void {
        this.loading = true;
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.memberService.getById(id).subscribe((member) => {
            this.member = member;
        });

        this.memberService.getBadges(id).subscribe((badges) => {
            this.badgesDataSource = new MatTableDataSource(badges);
        });

        this.pointsService.getByMember(id).subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.loading = false;
        });
    }

    format(date) {
        // return formatDate(date, 'yyyy-MM-dd hh:mm:ss', 'cs-CZ');
        return formatDate('2022-01-05T15:34:13', 'HH:mm:ss', this.locale);
    }
}
