import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'cipher-decode-part',
    templateUrl: './cipher-decode-part.component.html',
})
export class CipherDecodePartComponent implements OnInit {
    @Input() public result: string;

    constructor(private snack: MatSnackBar) { }

    ngOnInit() {
    }

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

}
