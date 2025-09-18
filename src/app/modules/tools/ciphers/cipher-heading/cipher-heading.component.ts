import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CipherDescDialogComponent } from '../cipher-desc-dialog/cipher-desc-dialog.component';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'cipher-heading',
    templateUrl: './cipher-heading.component.html',
    styleUrls: ['./cipher-heading.component.scss'],
    imports: [
        MatIconModule,
        MatButtonModule,
    ],
})
export class CipherHeadingComponent {
    @Input() public cipherName: string;
    @Input() public desc:string;

    constructor(private dialog: MatDialog) { }

    public showInfo(): void {
        this.dialog.open(CipherDescDialogComponent, {
            data: {
                cipherName: this.cipherName,
                desc: this.desc
            }
        });
    }

}
