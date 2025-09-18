import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CipherHeadingComponent } from "../cipher-heading/cipher-heading.component";
import { CipherEncodePartComponent } from "../cipher-encode-part/cipher-encode-part.component";
import { CipherDecodePartComponent } from "../cipher-decode-part/cipher-decode-part.component";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { BaseCipher } from "../base-cipher";

@Component({
    selector: 'morse-code',
    templateUrl: './morse-code.component.html',
    imports: [
        CipherHeadingComponent,
        CipherEncodePartComponent,
        CipherDecodePartComponent,
        FlexLayoutModule
    ],
    styleUrls: ['./morse-code.component.scss']
})
export class MorseCodeComponent extends BaseCipher {
    public desc: string = 'Morseova abeceda je skupina symbolů, která je používána v telegrafii. Kóduje znaky latinské abecedy, číslice a speciální znaky do kombinací krátkých a dlouhých signálů. Ty je možné přenášet na dálku jednodušším způsobem než všechny znaky abecedy.';
    private MORSE_CODE = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    };

    constructor(protected tools: ToolsService) {
        super(tools)
    }

    ngOnInit() {
    }

    public encode(text) {
        if (text === '') {
            this.result = '';
            return;
        }
        this.result = this.removeDiacritics(text).toUpperCase().split('').map(char => {
            if (this.MORSE_CODE[char]) {
                return this.MORSE_CODE[char] + '/';
            } else if (char === ' ') {
                return '/';
            } else {
                return char;
            }
        }).join('') + '//';
    }

}
