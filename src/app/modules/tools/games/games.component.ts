import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../core/services/tools.service';

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
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
