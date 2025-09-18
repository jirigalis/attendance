import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Schoolyear } from '../../models';
import { SchoolyearService } from '../../services/schoolyear.service';
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe, NgClass } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";
import { DividerWithTextComponent } from "../../../shared/divider-with-text/divider-with-text.component";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    imports: [
        MatIconModule,
        AsyncPipe,
        MatSidenavModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatSelectModule,
        MatListModule,
        MatIconModule,
        RouterModule,
        DividerWithTextComponent,
        MatButtonModule,
        NgClass,
    ],
})
export class NavigationComponent implements OnInit {
    @ViewChild('drawer') drawer: MatSidenav;
    schoolyear: number;
    schoolyears: Schoolyear[];

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Handset]).pipe(
        map(result => {
            return result.matches;
        }),
        shareReplay()
    );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private authService: AuthenticationService,
        private schoolyearService: SchoolyearService,
        private router: Router,
        private cd: ChangeDetectorRef,
    ) {
        router.events
            .pipe(
                withLatestFrom(this.isHandset$),
                filter(([a, b]) => b && a instanceof NavigationEnd)
            )
            .subscribe(_ => this.drawer?.close());
    }

    public ngOnInit(): void {  
        this.authService.currentUser.subscribe(val => {
            if (this.isLoggedIn()) {
                this.schoolyearService.getAllSchoolyears().subscribe(schoolyears => {
                    this.schoolyears = schoolyears;
                });
                this.schoolyear = this.authService.getSchoolyear();
                this.cd.detectChanges();
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
