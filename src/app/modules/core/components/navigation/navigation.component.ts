import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Schoolyear } from '../../models';
import { SchoolyearService } from '../../services/schoolyear.service';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    @ViewChild('drawer') drawer: MatSidenav;
    schoolyear: number;
    schoolyears: Schoolyear[];

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => {
            return result.matches;
        }),
        shareReplay()
    );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private authService: AuthenticationService,
        private schoolyearService: SchoolyearService,
        private router: Router
    ) {
        router.events
            .pipe(
                withLatestFrom(this.isHandset$),
                filter(([a, b]) => b && a instanceof NavigationEnd)
            )
            .subscribe(_ => this.drawer.close());
    }

    public ngOnInit(): void {
        this.authService.currentUser.subscribe(val => {
            if (this.isLoggedIn()) {
                this.schoolyearService.getAllSchoolyears().subscribe(schoolyears => {
                    this.schoolyears = schoolyears;
                });
                this.schoolyear = this.authService.getSchoolyear();
            }
        })
        
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        return this.authService.currentUserValue !== null;
    }

    public updateSchoolyear(schoolyearId: number) {
        if (schoolyearId !== this.authService.getSchoolyear()) {
            this.authService.selectSchoolyear(schoolyearId);
        }
    }
}
