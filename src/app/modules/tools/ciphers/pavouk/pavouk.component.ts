import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CiphersComponent } from '../ciphers.component';

@Component({
    selector: 'pavouk',
    templateUrl: './pavouk.component.html',
    styleUrls: ['./pavouk.component.css']
})
export class PavoukComponent extends CiphersComponent {
    public desc: string = 'Místo písmen ze zprávy se píšou dvě písmena sousední buď ve sloupci nebo v řádku. V každé tabulce musíme vynechat minimálně tři písmena. Ty jsou předem dohodnuté a nebo jsou napsány za zašifrovanou zprávou. V této verzi šifry chybí písmena Q, CH, W.'
    public ENCODE_TABLE = {
        'A': ['BC', 'JX'],
        'B': ['AC', 'EH'],
        'C': ['AB', 'OZ'],
        'D': ['EF', 'KT'],
        'E': ['DF', 'BH'],
        'F': ['DE', 'NV'],
        'G': ['HI', 'LP'],
        'H': ['GI', 'BE'],
        'I': ['GH', 'MS'],
        'J': ['AX', 'KL'],
        'K': ['DT', 'JL'],
        'L': ['JK', 'GP'],
        'M': ['NO', 'IS'],
        'N': ['MO', 'EV'],
        'O': ['MN', 'CZ'],
        'P': ['RS', 'GL'],
        'R': ['PS', 'UY'],
        'S': ['PR', 'IM'],
        'T': ['UV', 'DK'],
        'U': ['TV', 'RY'],
        'V': ['TU', 'FN'],
        'X': ['YZ', 'AJ'],
        'Y': ['XZ', 'RU'],
        'Z': ['XY', 'CO'],
    }

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(text: string) {
        if (text === '') {
            this.result = '';
            return;
        }

        this.result = this.removeDiacritics(text).toUpperCase().split('').map(char => {
            if (this.ENCODE_TABLE[char]) {
                return this.ENCODE_TABLE[char][Math.floor(Math.random() * 2)] + '; ';
            } else {
                return char;
            }
        }).join('');
    }

}
