import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CipherDescDialogComponent } from '../cipher-desc-dialog/cipher-desc-dialog.component';

@Component({
    selector: 'cipher-heading',
    templateUrl: './cipher-heading.component.html',
    styleUrls: ['./cipher-heading.component.scss']
})
export class CipherHeadingComponent implements OnInit {
    @Input() public cipherName: string;
    @Input() public desc:string;

    constructor(private dialog: MatDialog) { }

    ngOnInit() {
    }

    public showInfo(): void {
        this.dialog.open(CipherDescDialogComponent, {
            data: {
                cipherName: this.cipherName,
                desc: this.desc
            }
        });
    }

}
