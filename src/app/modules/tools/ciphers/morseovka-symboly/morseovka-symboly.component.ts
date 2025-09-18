import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CipherHeadingComponent } from "../cipher-heading/cipher-heading.component";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { CipherEncodePartComponent } from "../cipher-encode-part/cipher-encode-part.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { CipherDecodePartComponent } from "../cipher-decode-part/cipher-decode-part.component";
import { BaseCipher } from "../base-cipher";

@Component({
    selector: 'morseovka-symboly',
    templateUrl: './morseovka-symboly.component.html',
    imports: [
        CipherHeadingComponent,
        FlexLayoutModule,
        CipherEncodePartComponent,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        CipherDecodePartComponent,
    ],
    styleUrls: ['./morseovka-symboly.component.css']
})
export class MorseovkaSymbolyComponent extends BaseCipher {
    private MORSE_CODE = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    };
    public dotChar: string = '.';
    public dashChar: string = '-';

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
                return this.transformCharacters(this.MORSE_CODE[char]) + '/';
            } else if (char === ' ') {
                return '/';
            } else {
                return char;
            }
        }).join('') + '//';
    }

    public transformCharacters(char: string) {
        return char.replaceAll('.', this.dotChar).replaceAll('-', this.dashChar);
    }

    

}
