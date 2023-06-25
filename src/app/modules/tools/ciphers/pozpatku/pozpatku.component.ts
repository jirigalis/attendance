import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CiphersComponent } from '../ciphers.component';

@Component({
    selector: 'pozpatku',
    templateUrl: './pozpatku.component.html',
    styleUrls: ['./pozpatku.component.css']
})
export class PozpatkuComponent extends CiphersComponent {
    public desc: string = 'Otočení celé zprávy pozpátku. Výsledný text je čitelný od konce.'

    constructor(protected tools: ToolsService) {
        super(tools);
    }

    public encode(text) {
        if (text === '') {
            this.result = '';
            return;
        }
        this.result = text.split('').reverse().join('');
    }

}
