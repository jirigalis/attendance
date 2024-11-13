import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Member } from '../../core/models';
import { MemberService } from '../../core/services';
import { BadgeService } from '../../core/services/badge.service';
import { PointsService } from '../../core/services/points.service';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';
import { AddBadgeDialogComponent } from '../add-badge-dialog/add-badge-dialog.component';
import { AddBulkPointsDialogComponent } from '../add-bulk-points-dialog/add-bulk-points-dialog.component';

@Component({
    selector: 'points-dashboard',
    templateUrl: './points-dashboard.component.html',
    styleUrls: ['./points-dashboard.component.scss'],
})
export class PointsDashboardComponent implements OnInit {
    displayedColumns: string[] = ['name', 'sum_points', 'sum_attendance', 'sum_events', 'sum_overall'];
    displayedBadgesColumns: string[] = ['name', 'badges'];
    @ViewChild(MatSort) sort: MatSort;
    loading = false;
    dataSource;
    badgeDataSource;
    sumParams = {
        currentSchoolyear: true,
        schoolyearSum: true,
        schoolyearId: null,
    }

    constructor(
        private pointsService: PointsService,
        private badgeService: BadgeService,
        private memberService: MemberService,
        private authService: AuthenticationService,
        private snack: MatSnackBar,
        private changeDetectorRefs: ChangeDetectorRef,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.fetchDataFromServer();
        this.badgeService.getForAllMembers().subscribe((badges) => {
            this.badgeDataSource = new MatTableDataSource(badges);
        });
    }

    addBulkPoints() {
        const dialogRef = this.dialog.open(AddBulkPointsDialogComponent, {width: '700px'});

        dialogRef.afterClosed().subscribe((points) => {
            if (points) {
                this.loading = true;
                this.pointsService.addBulk(points).subscribe((res) => {
                    this.snack.open('Body byly úspěšně přidány', 'X', {
                        duration: 3000,
                    });
                    this.fetchDataFromServer();
                    this.loading = false;
                });
            }
        });
    }

    addBadge(member: Member = null) {
        const dialogRef = this.dialog.open(AddBadgeDialogComponent, {
            data: member,
        });

        dialogRef.afterClosed().subscribe((badge) => {
            if (badge) {
                this.loading = true;
                this.memberService
                    .addBadge(badge.member_id, badge.badge_id)
                    .subscribe((res) => {
                        this.snack.open('Odznak byl úspěšně přidán', 'X', {
                            duration: 3000,
                        });
                        this.refreshBadges();
                        this.loading = false;
                    });
            }
        });
    }

    deletePoints(pointsId) {
        const dialogRef = this.dialog.open(BasicDialogComponent);
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.loading = true;
                this.pointsService.delete(pointsId).subscribe((res2) => {
                    this.snack.open('Body odstraněny', 'X', {
                        duration: 3000,
                    });
                    this.fetchDataFromServer();
                    this.loading = false;
                });
            }
        });
    }

    public fetchDataFromServer() {
        this.loading = true;
        this.sumParams.schoolyearId = this.authService.getSchoolyear();
        this.pointsService.getSumForAllMembers(this.sumParams).subscribe((points) => {
            points.map(p => {
                p.sum_overall = parseInt(p.sum_points) + parseInt(p.sum_attendance) + parseInt(p.sum_event_attendance);
                // p.sum_overall_attendance = parseInt(p.sum_attendance) + parseInt(p.sum_event_attendance);
            })
            this.dataSource = new MatTableDataSource(points);
            this.dataSource.sort = this.sort;
            this.loading = false;
        });
    }

    private refreshBadges() {
        this.badgeService.getForAllMembers().subscribe((res) => {
            this.badgeDataSource.data = res;
        });
        this.changeDetectorRefs.detectChanges();
    }
}
