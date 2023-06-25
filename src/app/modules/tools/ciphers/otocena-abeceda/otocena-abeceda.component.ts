import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CiphersComponent } from '../ciphers.component';

@Component({
    selector: 'otocena-abeceda',
    templateUrl: './otocena-abeceda.component.html',
    styleUrls: ['./otocena-abeceda.component.css']
})
export class OtocenaAbecedaComponent extends CiphersComponent {
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
