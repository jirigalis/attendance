import { Component, OnInit } from '@angular/core';
import { CiphersComponent } from '../ciphers.component';
import { ToolsService } from 'src/app/modules/core/services/tools.service';

@Component({
    selector: 'obracena-morseovka',
    templateUrl: './obracena-morseovka.component.html',
    styleUrls: ['./obracena-morseovka.component.css']
})
export class ObracenaMorseovkaComponent extends CiphersComponent {
    public desc: string = 'Obrácená morseovka je varianta morseovky, kde tečky nahrazeny čárkami a čárky zase tečkami.'
    private MORSE_CODE = {
        'A': '-.', 'B': '.---', 'C': '.-.-', 'D': '.--', 'E': '-', 'F': '--.-',
        'G': '..-', 'H': '----', 'I': '--', 'J': '-...', 'K': '.-.', 'L': '-.--',
        'M': '..', 'N': '.-', 'O': '...', 'P': '-..-', 'Q': '..-.', 'R': '-.-',
        'S': '---', 'T': '.', 'U': '--.', 'V': '---.', 'W': '-..', 'X': '.--.',
        'Y': '.-..', 'Z': '..--', '0': '.....', '1': '-....', '2': '--...', '3': '---..',
        '4': '----.', '5': '-----', '6': '.----', '7': '..---', '8': '...--', '9': '....-',
    };

    constructor(protected tools: ToolsService) {
        super(tools)
    }

    public encode(event: any): void {
        if (event === '') {
            this.result = '';
            return;
        }
        this.result = this.removeDiacritics(event).toUpperCase().split('').map(char => {
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
