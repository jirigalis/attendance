import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from "../../../core/authentication/authentication.service";
import { RemoteScreenService, RemoteScreenType } from "../../../core/services/remote-screen.service";
import { first } from "rxjs";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'cipher-decode-part',
    templateUrl: './cipher-decode-part.component.html',
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule,
        MatInputModule,
        FormsModule,
    ]
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