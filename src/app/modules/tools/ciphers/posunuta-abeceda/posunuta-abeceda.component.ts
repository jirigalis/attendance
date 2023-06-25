import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CiphersComponent } from '../ciphers.component';

@Component({
    selector: 'posunuta-abeceda',
    templateUrl: './posunuta-abeceda.component.html',
    styleUrls: ['./posunuta-abeceda.component.css']
})
export class PosunutaAbecedaComponent extends CiphersComponent {
    public desc: string = 'Posunutá abeceda, nebo také Caesarova šifra. Každé písmeno v začifrovaném textu je posunuté o předem zadaný počet znaků. Např. při posunu o 3 znaky bude písmeno A nahrazeno písmenem D, B = E, C = F atd.';
    public shift: number = 3;

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(str: string): void {
        str = this.removeDiacritics(str.toLowerCase());
        let encodedStr = "";
        for (let i = 0; i < str.length; i++) {
            let charCode = str.charCodeAt(i);
            if (charCode >= 65 && charCode <= 90) {
                // uppercase letters
                encodedStr += String.fromCharCode(((charCode - 65 + this.shift) % 26) + 65);
            } else if (charCode >= 97 && charCode <= 122) {
                // lowercase letters
                encodedStr += String.fromCharCode(((charCode - 97 + this.shift) % 26) + 97);
            } else {
                // non-alphabetic characters
                encodedStr += str.charAt(i);
            }
        }
        this.result = encodedStr;
    }

}
