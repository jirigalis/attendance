import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { CipherHeadingComponent } from "../cipher-heading/cipher-heading.component";
import { CipherEncodePartComponent } from "../cipher-encode-part/cipher-encode-part.component";
import { CipherDecodePartComponent } from "../cipher-decode-part/cipher-decode-part.component";
import { BaseCipher } from "../base-cipher";

@Component({
    selector: 'zlomky',
    templateUrl: './zlomky.component.html',
    imports: [
        FlexLayoutModule,
        CipherHeadingComponent,
        CipherEncodePartComponent,
        CipherDecodePartComponent
    ],
    styleUrls: ['./zlomky.component.css']
})
export class ZlomkyComponent extends BaseCipher {
    public desc: string = 'Abeceda je rozdělena na pět skupin, každá se označí číslem 1 - 5. Písmeno se zakóduje jako číslo skupiny a číslo písmena v rámci skupiny. Př.: A je 1/1, B je 2/1, C je 3/1, ... , Z je 5/5. Mezery se zakódují jako dvojtečka.';
    public ENCODE_TABLE = {
        'A': ['1/1'],
        'B': ['2/1'],
        'C': ['3/1'],
        'D': ['4/1'],
        'E': ['5/1'],
        'F': ['1/2'],
        'G': ['2/2'],
        'H': ['3/2'],
        'I': ['4/2'],
        'J': ['5/2'],
        'K': ['1/3'],
        'L': ['2/3'],
        'M': ['3/3'],
        'N': ['4/3'],
        'O': ['5/3'],
        'P': ['1/4'],
        'Q': ['2/4'],
        'R': ['3/4'],
        'S': ['4/4'],
        'T': ['5/4'],
        'U': ['1/5'],
        'V': ['2/5'],
        'X': ['3/5'],
        'Y': ['4/5'],
        'Z': ['5/5'],
    }

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(text: string) {
        if (text === '') {
            this.result = '';
            return;
        }
        this.result = this.removeDiacritics(text).toUpperCase().split('').map(char => {
            if (this.ENCODE_TABLE[char]) {
                return this.ENCODE_TABLE[char] + '; ';
            } else if (char === ' ') {
                return ':';
            } else {
                return char;
            }
        }).join('');
    }


}
