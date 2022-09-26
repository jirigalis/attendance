import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from './modules/core/authentication/authentication.service';
import { User } from './modules/core/models/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'app';
    currentUser: User;
    showNavigation = true;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
        ) {
        this.authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    }

    ngOnInit(): void {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd)
        ).subscribe(x => {
            if (this.router.url !== '/bodovani') {
                this.showNavigation = true;
            }
        })        
    }
}
