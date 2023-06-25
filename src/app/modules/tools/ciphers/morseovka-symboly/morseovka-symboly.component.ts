import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CiphersComponent } from '../ciphers.component';

@Component({
    selector: 'morseovka-symboly',
    templateUrl: './morseovka-symboly.component.html',
    styleUrls: ['./morseovka-symboly.component.css']
})
export class MorseovkaSymbolyComponent extends CiphersComponent {
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
