import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from '../../core/models';
import { MemberService } from '../../core/services';
import { BadgeService } from '../../core/services/badge.service';
import { PointsService } from '../../core/services/points.service';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';
import { AddBadgeDialogComponent } from '../add-badge-dialog/add-badge-dialog.component';
import { AddPointsDialogComponent } from '../add-points-dialog/add-points-dialog.component';

@Component({
    selector: 'points-dashboard',
    templateUrl: './points-dashboard.component.html',
    styleUrls: ['./points-dashboard.component.scss'],
})
export class PointsDashboardComponent implements OnInit {
    displayedColumns: string[] = ['name', 'sum_points', 'actions'];
    displayedBadgesColumns: string[] = ['name', 'badges'];
    loading = false;
    dataSource;
    badgeDataSource;

    constructor(
        private pointsService: PointsService,
        private badgeService: BadgeService,
        private memberService: MemberService,
        private snack: MatSnackBar,
        private changeDetectorRefs: ChangeDetectorRef,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.pointsService.getSumForAllMembers().subscribe((points) => {
            this.dataSource = new MatTableDataSource(points);
            this.loading = false;
        });

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
