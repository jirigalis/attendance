import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortable, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { mergeMap } from 'rxjs/operators';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Schoolyear, User } from '../../core/models';
import { BadgeService } from '../../core/services/badge.service';
import { PointsService } from '../../core/services/points.service';
import { SchoolyearService } from '../../core/services/schoolyear.service';
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule } from "@angular/router";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgClass } from "@angular/common";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";

@Component({
    selector: 'bodovani',
    templateUrl: './bodovani.component.html',
    styleUrls: ['./bodovani.component.scss'],
    imports: [
        MatTabsModule,
        MatTableModule,
        MatSortModule,
        RouterModule,
        MatTooltipModule,
        NgClass,
        FlexLayoutModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatSelectModule,
    ],
})
export class BodovaniComponent implements OnInit {
    @ViewChild('pointsSort') public pointsSort: MatSort;
    @ViewChild('badgeSort') public badgeSort: MatSort;
    currentUser: User;
    loading = false;
    displayedColumns: string[] = ['name', 'sum_points_schoolyear'];
    displayedBadgesColumns: string[] = ['name', 'badges'];
    dataSource;
    badgeDataSource;
    schoolyears: Schoolyear[];
    selectedSchoolyear: number;
    colors: string[];

    constructor(
        private pointsService: PointsService,
        private badgeService: BadgeService,
        private schoolyearService: SchoolyearService,
        private authService: AuthenticationService
    ) {
        this.authService.currentUser.subscribe(
            (x) => (this.currentUser = x)
        );

        this.colors = this.generateColorGradient(20);
    }

    ngOnInit(): void {
        this.loading = true;
        this.schoolyearService.getCurrent().pipe(
            mergeMap(schoolyear => {
                this.selectedSchoolyear = schoolyear.id;
                return this.pointsService.getPublicSum(schoolyear.id);
            })
        ).subscribe(data => {
            this.colors = this.generateColorGradient(data.length);
            data.map((p, i) => {
                if (p.sum_points_schoolyear === null) {
                    p.sum_points_schoolyear = 0;
                }
                p.sum_points_schoolyear = parseInt(p.sum_points_schoolyear) + parseInt(p.sum_attendance_schoolyear) + parseInt(p.sum_event_attendance);
            })
            this.dataSource = new MatTableDataSource(data);
            this.pointsSort.sort(({ id: 'sum_points_schoolyear', start: 'desc' }) as MatSortable);
            this.dataSource.sort = this.pointsSort;

            // map colors
            data.map((p, i) => {
                p.color = this.colors[i];
            });

            this.loading = false;
        })

        this.schoolyearService.getAllSchoolyears().subscribe(schoolyears => this.schoolyears = schoolyears);

        this.badgeService.getForAllMembers(this.authService.getSchoolyear()).subscribe((badges) => {
            this.badgeDataSource = new MatTableDataSource(badges);
            this.badgeDataSource.sort = this.badgeSort;
        });
    }

    isLoggedIn() {
        return this.currentUser != null;
    }

    public updateSchoolyear(schoolyear) {
        this.selectedSchoolyear = schoolyear;
        this.pointsService.getPublicSum(schoolyear).subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
        })
    }

    private generateColorGradient(numColors: number): string[] {
        const colors: string[] = [];

        for (let i = 0; i < numColors; i++) {
            const r = Math.floor(255 * (i / (numColors - 1))); // Red component
            const g = Math.floor(255 * ((numColors - 1 - i) / (numColors - 1))); // Green component
            const b = 0; // Blue component

            const color = `rgb(${r},${g},${b})`; // Construct the color string
            colors.push(color);
        }

        return colors;
    }
}