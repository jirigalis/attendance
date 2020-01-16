import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, filter, withLatestFrom } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
    @ViewChild('drawer', { static: false }) drawer: MatSidenav;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => {
            console.log(result);
            return result.matches;
        }),
        shareReplay()
    );

    constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
        router.events
            .pipe(
                withLatestFrom(this.isHandset$),
                filter(([a, b]) => b && a instanceof NavigationEnd)
            )
            .subscribe(_ => this.drawer.close());
    }
}
