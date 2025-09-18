import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { CipherHeadingComponent } from "../cipher-heading/cipher-heading.component";
import { CipherEncodePartComponent } from "../cipher-encode-part/cipher-encode-part.component";
import { CipherDecodePartComponent } from "../cipher-decode-part/cipher-decode-part.component";
import { BaseCipher } from "../base-cipher";

@Component({
    selector: 'prvni-posledni',
    templateUrl: './prvni-posledni.component.html',
    imports: [
        FlexLayoutModule,
        CipherHeadingComponent,
        CipherEncodePartComponent,
        CipherDecodePartComponent
    ],
    styleUrls: ['./prvni-posledni.component.css']
})
export class PrvniPosledniComponent extends BaseCipher {
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
