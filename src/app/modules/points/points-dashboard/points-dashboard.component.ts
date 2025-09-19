import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Member } from '../../core/models';
import { BadgeService } from '../../core/services/badge.service';
import { PointsService } from '../../core/services/points.service';
import { AddBadgeDialogComponent } from '../add-badge-dialog/add-badge-dialog.component';
import { AddBulkPointsDialogComponent } from '../add-bulk-points-dialog/add-bulk-points-dialog.component';
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";

@Component({
    selector: 'points-dashboard',
    templateUrl: './points-dashboard.component.html',
    styleUrls: ['./points-dashboard.component.scss'],
    imports: [
        MatTabsModule,
        MatIconModule,
        MatCheckboxModule,
        FormsModule,
        FlexLayoutModule,
        MatTableModule,
        MatProgressBarModule,
        MatDividerModule,
        MatSortModule,
        MatButtonModule,
        RouterModule,
        MatTooltipModule,
    ]
})
export class PointsDashboardComponent implements OnInit {
    displayedColumns: string[] = ['name', 'sum_points', 'sum_attendance', 'sum_events', 'sum_overall'];
    displayedBadgesColumns: string[] = ['name', 'badges'];
    @ViewChild('pointsSort') sort: MatSort;
    @ViewChild('badgesSort') badgeSort: MatSort;
    loading = false;
    pointsDataSource;
    badgeDataSource;
    sumParams = {
        currentSchoolyear: true,
        schoolyearSum: true,
        schoolyearId: null,
    }

    constructor(
        private pointsService: PointsService,
        private badgeService: BadgeService,
        private authService: AuthenticationService,
        private snack: MatSnackBar,
        private changeDetectorRefs: ChangeDetectorRef,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadPoints();
        this.loadBadges();
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
                    this.loadPoints();
                    this.loading = false;
                });
            }
        });
    }

    addBulkBadges(member: Member = null) {
        const dialogRef = this.dialog.open(AddBadgeDialogComponent, {
            data: member,
            width: '700px',
        });

        dialogRef.afterClosed().subscribe((badges) => {
            if (badges) {
                this.loading = true;
                this.badgeService
                    .addBulkBadgesToMembers(badges.badge, badges.members.map((m) => m.id), badges.created_at)
                    .subscribe((res) => {
                        this.snack.open('Odznaky byly úspěšně přidány', 'X', {
                            duration: 3000,
                        });
                        this.loadBadges();
                        this.loading = false;
                    });
            }
        });
    }

    public loadPoints() {
        this.loading = true;
        this.sumParams.schoolyearId = this.authService.getSchoolyear();
        this.pointsService.getSumForAllMembers(this.sumParams).subscribe((points) => {
            points.map(p => {
                p.sum_overall = parseInt(p.sum_points) + parseInt(p.sum_attendance) + parseInt(p.sum_event_attendance);
            })
            this.pointsDataSource = new MatTableDataSource(points);
            this.pointsDataSource.sort = this.sort;
            this.loading = false;
        });
    }

    public loadBadges() {
        this.badgeService.getForAllMembers(this.authService.getSchoolyear()).subscribe((badges) => {
            this.badgeDataSource = new MatTableDataSource(badges);
            this.badgeDataSource.sort = this.badgeSort;
        });
        this.changeDetectorRefs.detectChanges();
    }
}