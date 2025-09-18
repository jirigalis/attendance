import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { CipherHeadingComponent } from "../cipher-heading/cipher-heading.component";
import { CipherEncodePartComponent } from "../cipher-encode-part/cipher-encode-part.component";
import { CipherDecodePartComponent } from "../cipher-decode-part/cipher-decode-part.component";
import { BaseCipher } from "../base-cipher";

@Component({
    selector: 'pozpatku-slova',
    templateUrl: './pozpatku-slova.component.html',
    imports: [
        FlexLayoutModule,
        CipherHeadingComponent,
        CipherEncodePartComponent,
        CipherDecodePartComponent
    ],
    styleUrls: ['./pozpatku-slova.component.css']
})
export class PozpatkuSlovaComponent extends BaseCipher {
    public desc: 'Tato šifra otočí jednotlivá slova pozpátku.'

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(text) {
        this.result = text.split(' ').map(word => {
            return word.split('').reverse().join('');
        }).join(' ');
    }

}
