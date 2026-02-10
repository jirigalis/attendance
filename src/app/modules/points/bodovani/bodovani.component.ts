import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortable, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { finalize, map, mergeMap } from 'rxjs/operators';
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
    displayedColumns: string[] = ['rank', 'name', 'sum_points_schoolyear'];
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
            }),
            map((data) => {
                return data.map(p => ({
                    ...p,
                    sum_points_schoolyear:
                        Number(p.sum_points_schoolyear || 0) +
                        Number(p.sum_attendance_schoolyear || 0) +
                        Number(p.sum_event_attendance || 0),
                }));
            }),
            map((data) => {
                return data.sort((a, b) => {
                    return b.sum_points_schoolyear - a.sum_points_schoolyear;
                });
            }),
            map((sortedData) => {
                const colors = this.generateColorGradient(sortedData.length);
                let currentRank = 1;
                return sortedData.map((p, i) => {
                    if (i > 0 && p.sum_points_schoolyear < sortedData[i - 1].sum_points_schoolyear) {
                        currentRank = i + 1;
                    }

                    return {
                        ...p,
                        rank: currentRank,
                        color: colors[i],
                    }
                });
            }),
            finalize(() => this.loading = false),
        ).subscribe(finalData => {
            this.dataSource = new MatTableDataSource(finalData);
            this.pointsSort.sort(({ id: 'sum_points_schoolyear', start: 'desc' }) as MatSortable);
            this.dataSource.sort = this.pointsSort;
        })

        this.schoolyearService.getAllSchoolyears().subscribe(schoolyears => this.schoolyears = schoolyears);

        this.badgeService.getForAllMembers(this.authService.getSchoolyear()).subscribe((badges) => {
            this.badgeDataSource = new MatTableDataSource(badges);
            this.badgeDataSource.sort = this.badgeSort;
        });
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
            const hue = numColors > 1 ? (i / (numColors - 1)) * 360 : 0;
            const rgb = this.hslToRgb(hue / 360, 0.8, 0.65);
            colors.push(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
        }

        return colors;
    }

    private hslToRgb(h: number, s: number, l: number): [number, number, number] {
        let r, g, b;

        if (s === 0) {
            r = g = b = l; // gray
        } else {
            const hue2rgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    }
}