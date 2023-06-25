import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CiphersComponent } from '../ciphers.component';

@Component({
    selector: 'prvni-posledni',
    templateUrl: './prvni-posledni.component.html',
    styleUrls: ['./prvni-posledni.component.css']
})
export class PrvniPosledniComponent extends CiphersComponent {
    public desc = 'Text je zašifrován tak, že první písmeno jde na první místo, druhé písmeno na poslední místo, třetí písmeno na druhé místo, čtvrté písmeno na předposlední místo atd.';

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(str: string) {
        str = str.toUpperCase();
        let even = '';
        let odd = '';
        for (let i = 0; i < str.length; i++) {
            if (i % 2 === 0) {
                even += str[i];
            } else {
                odd = str[i] + odd;
            }
        }
        this.result = even + odd;

    }

}
