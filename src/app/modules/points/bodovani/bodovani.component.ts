import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { User } from '../../core/models';
import { BadgeService } from '../../core/services/badge.service';
import { PointsService } from '../../core/services/points.service';

@Component({
    selector: 'bodovani',
    templateUrl: './bodovani.component.html',
    styleUrls: ['./bodovani.component.scss'],
})
export class BodovaniComponent implements OnInit {
    currentUser: User;
    loading = false;
    displayedColumns: string[] = ['name', 'sum_points'];
    displayedBadgesColumns: string[] = ['name', 'badges'];
    dataSource;
    badgeDataSource;

    constructor(
        private pointsService: PointsService,
        private badgeService: BadgeService,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(
            (x) => (this.currentUser = x)
        );
    }

    ngOnInit(): void {
        this.loading = true;
        this.pointsService
            .getSumForAllMembersByRole('D')
            .subscribe((points) => {
                this.dataSource = new MatTableDataSource(points);
                this.loading = false;
            });

        this.badgeService.getForAllMembers().subscribe((badges) => {
            this.badgeDataSource = new MatTableDataSource(badges);
        });
    }

    isLoggedIn() {
        return this.currentUser != null;
    }
}
