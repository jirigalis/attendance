import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../core/services/tools.service';
import { GamePictureRevealComponent } from "./game-picture-reveal/game-picture-reveal.component";
import { GameMestoJmenoComponent } from "./game-mesto-jmeno/game-mesto-jmeno.component";
import { MatTabsModule } from "@angular/material/tabs";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    imports: [
        GamePictureRevealComponent,
        GameMestoJmenoComponent,
        MatTabsModule,
        FlexLayoutModule,
    ],
    styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

    constructor(
        private tools: ToolsService
    ) { }

    ngOnInit() {
    }

    public goFullscreen() {
        this.tools.fullscreenOn();
    }

}
