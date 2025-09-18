import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CipherHeadingComponent } from "../cipher-heading/cipher-heading.component";
import { CipherEncodePartComponent } from "../cipher-encode-part/cipher-encode-part.component";
import { CipherDecodePartComponent } from "../cipher-decode-part/cipher-decode-part.component";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BaseCipher } from "../base-cipher";

@Component({
    selector: 'posunuta-abeceda',
    templateUrl: './posunuta-abeceda.component.html',
    imports: [
        CipherHeadingComponent,
        CipherEncodePartComponent,
        MatFormFieldModule,
        CipherDecodePartComponent,
        FormsModule,
        FlexLayoutModule,
        MatInputModule,
    ],
    styleUrls: ['./posunuta-abeceda.component.css']
})
export class PosunutaAbecedaComponent extends BaseCipher {
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
