import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CipherHeadingComponent } from "../cipher-heading/cipher-heading.component";
import { CipherEncodePartComponent } from "../cipher-encode-part/cipher-encode-part.component";
import { FormsModule } from "@angular/forms";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { CipherDecodePartComponent } from "../cipher-decode-part/cipher-decode-part.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatInputModule } from "@angular/material/input";
import { BaseCipher } from "../base-cipher";

@Component({
    selector: 'petromilka',
    templateUrl: './petromilka.component.html',
    imports: [
        CipherHeadingComponent,
        CipherEncodePartComponent,
        MatFormFieldModule,
        FormsModule,
        MatSlideToggle,
        CipherDecodePartComponent,
        FlexLayoutModule,
        MatInputModule,
    ],
    styleUrls: ['./petromilka.component.css']
})
export class PetromilkaComponent extends BaseCipher {
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
