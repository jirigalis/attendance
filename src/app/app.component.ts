import { AuthenticationService } from './modules/core/authentication/authentication.service';
import { MemberService } from './modules/core/services/member.service';
import { Component } from '@angular/core';
import { User } from './modules/core/models/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
    currentUser: User;

    constructor(private memberService: MemberService, private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    }
}
