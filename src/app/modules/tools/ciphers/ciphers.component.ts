import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../core/services/tools.service';

@Component({
    selector: 'app-ciphers',
    templateUrl: './ciphers.component.html',
    styleUrls: ['./ciphers.component.scss']
})
export class CiphersComponent implements OnInit {
    public desc: string = '';
    public fontSize: number = 1;
    public liveEncoding: boolean = true;
    public input: string;
    public result: string;
    public selectedCipher = 1;
    public transpositionCiphers = [
        { id: 1, name: 'Pozpátku' },
        { id: 2, name: 'Pozpátku slova' },
        { id: 3, name: 'Pozpátku x znaků' },
        { id: 4, name: 'Vkládání znaků' },
        { id: 5, name: 'Každé x-té písmeno' },
        { id: 6, name: 'První poslední' },
        /*  { id: 7, name: 'Velká malá písmena' },
         { id: 8, name: 'Podle schématu'}, */
        { id: 9, name: 'První písmeno ve slově' },
    ];
    public substituteCiphers = [
        { id: 10, name: 'Petromilka' },
        { id: 11, name: 'Posunutá abeceda' },
        { id: 12, name: 'Obrácená abeceda' },
        { id: 13, name: 'Pavouk' },
        { id: 14, name: 'Zlomky' },
        /* { id: 15, name: 'Mřížka' },
        { id: 16, name: 'Velký polský kříž' }, */
    ]
    public morseCodeCiphers = [
        { id: 17, name: 'Základní' },
        { id: 18, name: 'Obrácená' },
        { id: 19, name: 'Obrácená písmena' },
        { id: 20, name: 'Sudá lichá čísla' },
        { id: 21, name: 'Symboly' },
    ]

    ngOnInit() {
    }

    constructor(
        protected tools: ToolsService,
    ) { }

    public selectCipher(id) {
        this.selectedCipher = id;
    }

    public encode(event) {
        this.result = this.input;
    }

    public decode() {
        this.input = this.result;
    }

    protected removeDiacritics(text) {
        if (text === '') {
            return '';
        }
        const specialLetters = {
            'á': 'a', 'č': 'c', 'ď': 'd', 'é': 'e', 'ě': 'e', 'í': 'i', 'ň': 'n', 'ó': 'o', 'ř': 'r', 'š': 's', 'ť': 't', 'ú': 'u', 'ů': 'u', 'ý': 'y', 'ž': 'z',
            'Á': 'A', 'Č': 'C', 'Ď': 'D', 'É': 'E', 'Ě': 'E', 'Í': 'I', 'Ň': 'N', 'Ó': 'O', 'Ř': 'R', 'Š': 'S', 'Ť': 'T', 'Ú': 'U', 'Ů': 'U', 'Ý': 'Y', 'Ž': 'Z'
        };
        return text.replace(/[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/g, match => specialLetters[match]);
    }

}
