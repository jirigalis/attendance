import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CiphersComponent } from '../ciphers.component';

@Component({
    selector: 'kazde-x-pismeno',
    templateUrl: './kazde-x-pismeno.component.html',
    styleUrls: ['./kazde-x-pismeno.component.css']
})
export class KazdeXPismenoComponent extends CiphersComponent {
    public desc = 'Každé x-té písmeno ze zašifrovaného textu patří do původní zprávy. Pokud je tedy X = 2, pak je každé druhé písmeno platné. POZOR! První písmeno je platné vždy.';
    public count = 3;

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(str: string) {
        str = this.removeDiacritics(str.toUpperCase());
        let result = '';
        for (let i = 0; i < str.length; i++) {
            result += str[i];
            for (let j = 0; j < this.count - 1; j++) {
                result += String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase();
            }
        }
        this.result = result;
    }

}
