import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../core/services/tools.service';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { DividerWithTextComponent } from "../../shared/divider-with-text/divider-with-text.component";
import { PozpatkuComponent } from "./pozpatku/pozpatku.component";
import { PozpatkuSlovaComponent } from "./pozpatku-slova/pozpatku-slova.component";
import { PozpatkuZnakyComponent } from "./pozpatku-znaky/pozpatku-znaky.component";
import { VkladaniZnakuComponent } from "./vkladani-znaku/vkladani-znaku.component";
import { KazdeXPismenoComponent } from "./kazde-x-pismeno/kazde-x-pismeno.component";
import { PrvniPosledniComponent } from "./prvni-posledni/prvni-posledni.component";
import { PrvniPismenoComponent } from "./prvni-pismeno/prvni-pismeno.component";
import { PetromilkaComponent } from "./petromilka/petromilka.component";
import { PosunutaAbecedaComponent } from "./posunuta-abeceda/posunuta-abeceda.component";
import { OtocenaAbecedaComponent } from "./otocena-abeceda/otocena-abeceda.component";
import { PavoukComponent } from "./pavouk/pavouk.component";
import { ZlomkyComponent } from "./zlomky/zlomky.component";
import { MorseCodeComponent } from "./morse-code/morse-code.component";
import { ObracenaMorseovkaComponent } from "./obracena-morseovka/obracena-morseovka.component";
import { ObracenaMorseovkaPismenaComponent } from "./obracena-morseovka-pismena/obracena-morseovka-pismena.component";
import { MorseovkaSudaLichaCislaComponent } from "./morseovka-suda-licha-cisla/morseovka-suda-licha-cisla.component";
import { MorseovkaSymbolyComponent } from "./morseovka-symboly/morseovka-symboly.component";

@Component({
    selector: 'app-ciphers',
    templateUrl: './ciphers.component.html',
    imports: [
        FlexLayoutModule,
        MatCardModule,
        MatListModule,
        DividerWithTextComponent,
        PozpatkuComponent,
        PozpatkuSlovaComponent,
        PozpatkuZnakyComponent,
        VkladaniZnakuComponent,
        KazdeXPismenoComponent,
        PrvniPosledniComponent,
        PrvniPismenoComponent,
        PetromilkaComponent,
        PosunutaAbecedaComponent,
        OtocenaAbecedaComponent,
        PavoukComponent,
        ZlomkyComponent,
        MorseCodeComponent,
        ObracenaMorseovkaComponent,
        ObracenaMorseovkaPismenaComponent,
        MorseovkaSudaLichaCislaComponent,
        MorseovkaSymbolyComponent,
    ],
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

}
