import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { CipherHeadingComponent } from "../cipher-heading/cipher-heading.component";
import { CipherEncodePartComponent } from "../cipher-encode-part/cipher-encode-part.component";
import { CipherDecodePartComponent } from "../cipher-decode-part/cipher-decode-part.component";
import { BaseCipher } from "../base-cipher";

@Component({
    selector: 'otocena-abeceda',
    templateUrl: './otocena-abeceda.component.html',
    imports: [
        FlexLayoutModule,
        CipherHeadingComponent,
        CipherEncodePartComponent,
        CipherDecodePartComponent
    ],
    styleUrls: ['./otocena-abeceda.component.css']
})
export class OtocenaAbecedaComponent extends BaseCipher {
    public desc = 'Tato šifra nahrazuje každé písmeno v abeceně příslušným písmenem z obrácené abecedy, tedy A = Z, B = Y, C = X atd. V této šifře není použito písmeno CH.';

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(str) {
        const normalAlphabet = ToolsService.ABC;
        let revertedAlphabet = '';
        str = this.removeDiacritics(str.toLowerCase());

        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            const index = normalAlphabet.indexOf(char.toLowerCase());
            if (index !== -1) {
                const revertedIndex = 25 - index;
                const revertedChar = normalAlphabet[revertedIndex];
                revertedAlphabet += char === char.toUpperCase() ? revertedChar.toUpperCase() : revertedChar;
            } else {
                revertedAlphabet += char;
            }
        }
        this.result = revertedAlphabet;
    }

}
