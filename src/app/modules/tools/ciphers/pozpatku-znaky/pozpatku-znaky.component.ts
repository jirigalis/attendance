import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CiphersComponent } from '../ciphers.component';

@Component({
    selector: 'pozpatku-znaky',
    templateUrl: './pozpatku-znaky.component.html',
    styleUrls: ['./pozpatku-znaky.component.css']
})
export class PozpatkuZnakyComponent extends CiphersComponent {
    public revertLength: number = 3;
    public desc = 'Tato šifra ve vstupním textu vypíše pozpátku vždy daný počet znaků posobě. Např. Každé tři znaky (včetně mezer) jsou napsány pozpátku.';

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(str) {
        this.result = this.splitString(str, this.revertLength).map(s => s.split('').reverse().join('')).join('');
    }

    private splitString(str, len) {
        var result = [];
        for (var i = 0; i < str.length; i += len) {
            result.push(str.substr(i, len));
        }
        return result;
    }
}
