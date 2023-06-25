import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CiphersComponent } from '../ciphers.component';

@Component({
    selector: 'petromilka',
    templateUrl: './petromilka.component.html',
    styleUrls: ['./petromilka.component.css']
})
export class PetromilkaComponent extends CiphersComponent {
    public desc: string = 'Nahradí každé písmeno v textu číslicí podle předem daného klíče. Př.: Klíčové slovo je "PETROMILKA". Pak P je nahrazeno 1, E je nahrazeno 2, ... , A je nahrazenou 0. Pomocí přepínače lze kódové slovo číslovat od 0 do 9. Kódové slovo je bráno bez diakritiky.';
    public codeWord: string = 'petromilka';
    public startWithZero: boolean = false;

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(str) {
        str = this.removeDiacritics(str.toLowerCase());
        let codeWordPlain = this.removeDiacritics(this.codeWord.toLowerCase());
        let offset = this.startWithZero ? 0 : 1;
        const charMap = codeWordPlain.split('').map((char, index) => [char, ((index + offset) % 10).toString()]);

        let result = '';

        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            const mapping = charMap.find(([c]) => c === char);
            if (mapping) {
                result += mapping[1];
            } else {
                result += char;
            }
        }

        this.result = result;
    }

}
