import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CipherHeadingComponent } from "../cipher-heading/cipher-heading.component";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { CipherDecodePartComponent } from "../cipher-decode-part/cipher-decode-part.component";
import { CipherEncodePartComponent } from "../cipher-encode-part/cipher-encode-part.component";
import { BaseCipher } from "../base-cipher";

@Component({
    selector: 'vkladani-znaku',
    templateUrl: './vkladani-znaku.component.html',
    imports: [
        CipherHeadingComponent,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        CipherDecodePartComponent,
        CipherEncodePartComponent,
    ],
    styleUrls: ['./vkladani-znaku.component.css']
})
export class VkladaniZnakuComponent extends BaseCipher {
    public desc = 'Do zdrojového textu je po každém písmenu vložena předem zadaná sekvence znaků.'
    public falseString = 'LA';

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(str) {
        const result = this.removeDiacritics(str.toUpperCase()).split('').join(this.falseString.toUpperCase());
        this.result = result;
    }

}
