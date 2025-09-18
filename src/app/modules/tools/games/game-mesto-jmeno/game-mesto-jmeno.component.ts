import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { LetterGeneratorComponent } from '../letter-generator/letter-generator.component';
import { MatCardModule } from "@angular/material/card";
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { FormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MaximizeDirective } from "../../../shared/maximize.directive";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: 'game-mesto-jmeno',
    imports: [
        MatCardModule,
        MatDrawer,
        MatSliderModule,
        FormsModule,
        MatSlideToggleModule,
        FlexLayoutModule,
        MatDrawerContent,
        MatDrawerContainer,
        MaximizeDirective,
        MatButtonModule,
        MatIconModule,
        LetterGeneratorComponent,
        MatListModule,
        MatInputModule,
    ],
    templateUrl: './game-mesto-jmeno.component.html',
    styleUrls: ['./game-mesto-jmeno.component.scss']
})
export class GameMestoJmenoComponent implements OnInit {
    @ViewChild('letter') letter: LetterGeneratorComponent;
    public letterConfig = {
        fontSize: '17rem',
        abc: ToolsService.ABC_CH,
    }
    public fontSize = 3;
    public useCh: boolean = true;
    public useWordCategories: boolean = false;
    public selectedCategory: string = '';
    public allCategories: string[];
    public wordList: string[] = [
        'Město',
        'Jméno',
        'Zvíře',
        'Ženské jméno',
        'Mužské jméno',
        'Rostlina',
        'Značka auta',
        'Pták',
        'Jídlo',
        'film',
        'Filmová postava',
        'Pohádka',
        'Pohádková postava',
        'Stát',
        'Povolání',
        'Sport',
        'Sportovec',
        'Pití',
    ];

    constructor(public tools: ToolsService) { }

    ngOnInit() {
    }

    public updateLetterSize() {
        this.letterConfig.fontSize = 8 + (this.fontSize *3) + 'rem';
        this.letter.config.fontSize = this.letterConfig.fontSize;
    }

    public useChUpdate() {
        if (this.useCh) {
            this.letter.config.abc = ToolsService.ABC_CH;
        } else {
            this.letter.config.abc = ToolsService.ABC;
        }
    }

    @HostListener('document:keypress', ['$event'])
    public pickWordCategory(event) {
        if (event.code === 'Enter') {
            this.selectedCategory = this.allCategories[Math.floor(Math.random()*this.allCategories.length)]
        }
    }

}
