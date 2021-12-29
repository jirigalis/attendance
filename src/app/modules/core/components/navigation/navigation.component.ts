import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, filter, withLatestFrom } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
    @ViewChild('drawer') drawer: MatSidenav;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => {
            return result.matches;
        }),
        shareReplay()
    );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private authService: AuthenticationService,
        private router: Router
    ) {
        router.events
            .pipe(
                withLatestFrom(this.isHandset$),
                filter(([a, b]) => b && a instanceof NavigationEnd)
            )
            .subscribe(_ => this.drawer.close());
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        return this.authService.currentUserValue !== null;
    }
}
