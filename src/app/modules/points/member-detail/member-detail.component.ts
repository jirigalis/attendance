import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Member } from '../../core/models';
import { MemberService } from '../../core/services';
import { PointsService } from '../../core/services/points.service';
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CustomDatePipe } from "../../shared/pipes/custom-date.pipe";
import { NgClass } from "@angular/common";

@Component({
    selector: 'member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.scss'],
    imports: [
        MatTabsModule,
        MatProgressBarModule,
        MatTableModule,
        MatSortModule,
        CustomDatePipe,
        NgClass,
    ],
})
export class MemberDetailComponent implements OnInit {
    member?: Member;
    displayedColumns: string[] = ['reason', 'points', 'created_at'];
    badgesColumns: string[] = ['badge', 'logo', 'created_at'];
    dataSource: MatTableDataSource<any>;
    badgesDataSource: MatTableDataSource<any>;
    @ViewChild(MatSort) sort: MatSort;
    loading = false;
    constructor(
        private memberService: MemberService,
        private pointsService: PointsService,
        private authService: AuthenticationService,
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

        this.pointsService.getByMemberAndSchoolyear(id, this.authService.getSchoolyear()).subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.loading = false;
        });
    }
}
