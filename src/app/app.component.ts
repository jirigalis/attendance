import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from './modules/core/authentication/authentication.service';
import { User } from './modules/core/models';
import { ToolsEvents, ToolsService } from './modules/core/services/tools.service';
import { NavigationComponent } from "./modules/core/components/navigation/navigation.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        NavigationComponent,
    ],
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'app';
    currentUser: User;
    showNavigation = true;
    fulscreen = false;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private tools: ToolsService,
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
        }); 
        
        this.tools.fullscreen.subscribe(ev => {
            if (ev === ToolsEvents.FULLSCREEN_ON) {
                this.fulscreen = true;
                this.showNavigation = false;
            } else if (ev === ToolsEvents.FULLSCREEN_OFF) {
                this.fulscreen = false;

            }
        })
    }

    @HostListener('document:keydown.escape', ['$event'])
    public catchEscKey(ev) {
        if (this.tools.isFullscreen()) {
            this.tools.fullscreenOff();
        }
    }
}
