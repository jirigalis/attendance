import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CipherHeadingComponent } from "../cipher-heading/cipher-heading.component";
import { CipherEncodePartComponent } from "../cipher-encode-part/cipher-encode-part.component";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CipherDecodePartComponent } from "../cipher-decode-part/cipher-decode-part.component";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { BaseCipher } from "../base-cipher";

@Component({
    selector: 'kazde-x-pismeno',
    templateUrl: './kazde-x-pismeno.component.html',
    imports: [
        CipherHeadingComponent,
        CipherEncodePartComponent,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        CipherDecodePartComponent,
        FlexLayoutModule,
    ],
    styleUrls: ['./kazde-x-pismeno.component.css']
})
export class KazdeXPismenoComponent extends BaseCipher {
    public desc = 'Každé x-té písmeno ze zašifrovaného textu patří do původní zprávy. Pokud je tedy X = 2, pak je každé druhé písmeno platné. POZOR! První písmeno je platné vždy.';
    public count = 3;

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(str: string) {
        str = this.removeDiacritics(str.toUpperCase());
        let result = '';
        for (let i = 0; i < str.length; i++) {
            result += str[i];
            for (let j = 0; j < this.count - 1; j++) {
                result += String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase();
            }
        }
        this.result = result;
    }

}
