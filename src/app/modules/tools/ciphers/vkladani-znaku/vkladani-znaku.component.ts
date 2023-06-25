import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CiphersComponent } from '../ciphers.component';

@Component({
    selector: 'vkladani-znaku',
    templateUrl: './vkladani-znaku.component.html',
    styleUrls: ['./vkladani-znaku.component.css']
})
export class VkladaniZnakuComponent extends CiphersComponent {
    public desc = 'Do zdrojového textu je po každém písmenu vložena předem zadaná sekvence znaků.'
    public falseString = 'LA';

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(str) {
        const result = this.removeDiacritics(str.toUpperCase()).split('').join(this.falseString.toUpperCase());
        this.result = result;
    }

}
