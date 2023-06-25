import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CiphersComponent } from '../ciphers.component';

@Component({
    selector: 'morseovka-suda-licha-cisla',
    templateUrl: './morseovka-suda-licha-cisla.component.html',
    styleUrls: ['./morseovka-suda-licha-cisla.component.css']
})
export class MorseovkaSudaLichaCislaComponent extends CiphersComponent {
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
        const plusMinus = ['+', '-'];
        const multiplyDivide = ['*', '/'];

        this.result = this.removeDiacritics(text).toUpperCase().split('').map(char => {
            if (this.MORSE_CODE[char]) {
                return this.convertToNumbers(this.MORSE_CODE[char]) + multiplyDivide[Math.floor(Math.random() * multiplyDivide.length)];
            } else if (char === ' ') {
                return '|';
            } else {
                return char;
            }
        }).join('') + '!';

        this.result = this.result
            .replaceAll('*|', plusMinus[Math.floor(Math.random() * plusMinus.length)])
            .replaceAll('/|', plusMinus[Math.floor(Math.random() * plusMinus.length)])
            .replaceAll('/!', '=')
            .replaceAll('*!', '=')
            ;
    }
    
    private convertToNumbers(char: string) {
        const odd = ['1','3','5','7','9'];
        const even = ['2','4','6','8','0'];
        const charArray = char.split('');

        for (let i = 0; i < char.length; i++) {
            if (char[i] === '.') {
                charArray[i] = odd[Math.floor(Math.random() * odd.length)];
            } else if (char[i] === '-') {
                charArray[i] = even[Math.floor(Math.random() * even.length)];
            }
        }
        return charArray.join('');
    }

}
