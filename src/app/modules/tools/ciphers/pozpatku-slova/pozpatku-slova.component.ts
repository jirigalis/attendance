import { Component } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { CiphersComponent } from '../ciphers.component';

@Component({
    selector: 'pozpatku-slova',
    templateUrl: './pozpatku-slova.component.html',
    styleUrls: ['./pozpatku-slova.component.css']
})
export class PozpatkuSlovaComponent extends CiphersComponent {
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
