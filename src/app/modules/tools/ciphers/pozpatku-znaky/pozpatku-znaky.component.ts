import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { CipherHeadingComponent } from "../cipher-heading/cipher-heading.component";
import { CipherEncodePartComponent } from "../cipher-encode-part/cipher-encode-part.component";
import { CipherDecodePartComponent } from "../cipher-decode-part/cipher-decode-part.component";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BaseCipher } from "../base-cipher";

@Component({
    selector: 'pozpatku-znaky',
    templateUrl: './pozpatku-znaky.component.html',
    imports: [
        FlexLayoutModule,
        CipherHeadingComponent,
        CipherEncodePartComponent,
        MatFormFieldModule,
        CipherDecodePartComponent,
        FormsModule,
        MatInputModule,
    ],
    styleUrls: ['./pozpatku-znaky.component.css']
})
export class PozpatkuZnakyComponent extends BaseCipher {
    public revertLength: number = 3;
    public desc = 'Tato šifra ve vstupním textu vypíše pozpátku vždy daný počet znaků posobě. Např. Každé tři znaky (včetně mezer) jsou napsány pozpátku.';

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(str) {
        this.result = this.splitString(str, this.revertLength).map(s => s.split('').reverse().join('')).join('');
    }

    private splitString(str, len) {
        var result = [];
        for (var i = 0; i < str.length; i += len) {
            result.push(str.substr(i, len));
        }
        return result;
    }
}
