import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Member } from '../../core/models';
import { MemberService } from '../../core/services';
import { BadgeService } from '../../core/services/badge.service';
import { PointsService } from '../../core/services/points.service';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';
import { AddBadgeDialogComponent } from '../add-badge-dialog/add-badge-dialog.component';
import { AddBulkPointsDialogComponent } from '../add-bulk-points-dialog/add-bulk-points-dialog.component';
import { AddPointsDialogComponent } from '../add-points-dialog/add-points-dialog.component';

@Component({
    selector: 'points-dashboard',
    templateUrl: './points-dashboard.component.html',
    styleUrls: ['./points-dashboard.component.scss'],
})
export class PointsDashboardComponent implements OnInit {
    displayedColumns: string[] = ['name', 'sum_points', 'sum_attendance', 'sum_overall', 'actions'];
    displayedBadgesColumns: string[] = ['name', 'badges'];
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

    addPoints(member: Member = null) {
        const dialogRef = this.dialog.open(AddPointsDialogComponent, {
            data: member,
        });

        dialogRef.afterClosed().subscribe((points) => {
            if (points) {
                this.loading = true;
                this.pointsService.add(points).subscribe((res) => {
                    this.snack.open('Body byly úspěšně přidány', 'X', {
                        duration: 3000,
                    });
                    this.refresh();
                    this.loading = false;
                });
            }
        });
    }

    addBulkPoints() {
        const dialogRef = this.dialog.open(AddBulkPointsDialogComponent);

        dialogRef.afterClosed().subscribe((points) => {
            if (points) {
                this.loading = true;
                this.pointsService.addBulk(points).subscribe((res) => {
                    this.snack.open('Body byly úspěšně přidány', 'X', {
                        duration: 3000,
                    });
                    this.refresh();
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
                    this.snack.open('Kategorie odstraněna', 'X', {
                        duration: 3000,
                    });
                    this.refresh();
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
                p.sum_overall = parseInt(p.sum_points) + parseInt(p.sum_attendance);
            })
            this.dataSource = new MatTableDataSource(points);
            this.loading = false;
        });
    }

    private refresh() {
        this.pointsService.getSumForAllMembers().subscribe((res) => {
            this.dataSource.data = res;
        });
        this.changeDetectorRefs.detectChanges();
    }

    private refreshBadges() {
        this.badgeService.getForAllMembers().subscribe((res) => {
            this.badgeDataSource.data = res;
        });
        this.changeDetectorRefs.detectChanges();
    }
}
