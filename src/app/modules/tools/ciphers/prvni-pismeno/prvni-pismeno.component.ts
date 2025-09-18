import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { CipherHeadingComponent } from "../cipher-heading/cipher-heading.component";
import { CipherEncodePartComponent } from "../cipher-encode-part/cipher-encode-part.component";
import { CipherDecodePartComponent } from "../cipher-decode-part/cipher-decode-part.component";
import { BaseCipher } from "../base-cipher";

@Component({
    selector: 'prvni-pismeno',
    templateUrl: './prvni-pismeno.component.html',
    imports: [
        FlexLayoutModule,
        CipherHeadingComponent,
        CipherEncodePartComponent,
        CipherDecodePartComponent
    ],
    styleUrls: ['./prvni-pismeno.component.css']
})
export class PrvniPismenoComponent extends BaseCipher {
    public desc: string = 'První písmeno je šifra, která nahrazuje každé písmeno náhodným slovem začínajícím na toto písmeno. Například písmeno A může být nahrazeno slovem Ahoj.';

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(text: string) {
        if (text === '') {
            return '';
        }

        this.result = this.removeDiacritics(text).split('').map((char) => {
            if (char === ' ') {
                return '';
            }
            return this.getRandomWord(char) + ' ';
        }).join('');
    }

    public getRandomWord(char: string) {
        const words = ToolsService.COMMON_WORDS;
        const filteredWords = words.filter((word) => {
            return word[0] === char.toLowerCase();
        });
        const randomIndex = Math.floor(Math.random() * filteredWords.length);
        return filteredWords[randomIndex];
    }

}
