import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from "../../../core/authentication/authentication.service";
import { RemoteScreenService, RemoteScreenType } from "../../../core/services/remote-screen.service";
import { first } from "rxjs";

@Component({
    selector: 'cipher-decode-part',
    templateUrl: './cipher-decode-part.component.html',
})
export class CipherDecodePartComponent {
    @Input() public result: string;

    constructor(
        private snack: MatSnackBar,
        private auth: AuthenticationService,
        private remoteScreenService: RemoteScreenService,
    ) { }

    public copyToClipboard() {
        navigator.clipboard.writeText(this.result)
            .then(() => {
                this.snack.open('Úspěšně zkopírováno.', 'X', {
                    duration: 3000
                });
            })
    }

    public clearResult() {
        this.result = '';
    }

    public sendToRemoteScreen() {
        const userId = this.auth.currentUserValue.id;
        this.remoteScreenService.sendUpdate(userId, { value: this.result, type: RemoteScreenType.TEXT })
            .pipe(first())
            .subscribe(() => {
                this.snack.open('Úspěšně odesláno na vzdálený displej.', 'X', {
                    duration: 3000
                });
            });
    }

}