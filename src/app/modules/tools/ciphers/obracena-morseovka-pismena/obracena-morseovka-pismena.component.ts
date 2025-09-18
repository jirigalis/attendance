import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { CipherHeadingComponent } from "../cipher-heading/cipher-heading.component";
import { CipherEncodePartComponent } from "../cipher-encode-part/cipher-encode-part.component";
import { CipherDecodePartComponent } from "../cipher-decode-part/cipher-decode-part.component";
import { BaseCipher } from "../base-cipher";

@Component({
    selector: 'obracena-morseovka-pismena',
    templateUrl: './obracena-morseovka-pismena.component.html',
    imports: [
        FlexLayoutModule,
        CipherHeadingComponent,
        CipherEncodePartComponent,
        CipherDecodePartComponent
    ],
    styleUrls: ['./obracena-morseovka-pismena.component.css']
})
export class ObracenaMorseovkaPismenaComponent extends BaseCipher {
    public desc: string = 'Obrácená morseovka je varianta morseovky, kde jednotlivá písmena jsou napsána pozpátku.'
    private MORSE_CODE = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    };
    
    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(text) {
        if (text === '') {
            this.result = '';
            return;
        }
        this.result = this.removeDiacritics(text).toUpperCase().split('').map(char => {
            if (this.MORSE_CODE[char]) {
                return this.revertString(this.MORSE_CODE[char]) + '/';
            } else if (char === ' ') {
                return '/';
            } else {
                return char;
            }
        }).join('') + '//';
    }

    private revertString(str: string) {
        return str.split('').reverse().join('');
    }

}
