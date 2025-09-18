import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/modules/core/services/tools.service';
import { NgStyle } from "@angular/common";

export interface LetterGeneratorConfig {
    abc?: string|string[]; // character set
    duration?: number; // length of last step of generation animation. 0 is no animation
    upperCase?: boolean;
    fontSize?: string;
}

@Component({
    selector: 'letter-generator',
    templateUrl: './letter-generator.component.html',
    imports: [
        NgStyle
    ],
    styleUrls: ['./letter-generator.component.scss']
})
export class LetterGeneratorComponent implements OnInit {
    public randomLetter: string = '-';
    public running = false;
    private defaultConfig: LetterGeneratorConfig = {
        abc: ToolsService.ABC,
        duration: 1500,
        upperCase: true,
        fontSize: '16px',
    }
    @Input() public config: LetterGeneratorConfig;

    constructor(
        private tools: ToolsService
    ) { }

    ngOnInit() {
        this.config = { ...this.defaultConfig, ...this.config}
    }

    @HostListener('document:keypress', ['$event'])
    public roll(event) {
        let x = 0.01;
        if (event.code === 'Space' && !this.running) {
            this.running = true;
            this.changeLetter(1, x);
        }
    }

    private changeLetter(timeout, x) {
        let diff = x < 0.1 ? 0.01 : 0.1;
        if (x >= 1) {
            this.running = false;
            return;
        }
        
        return setTimeout(() => {
            this.randomLetter = this.getRandomLetter();
            this.changeLetter(Math.round(this.config.duration * this.easeIn3(x)), x+=diff);
        }, timeout);
    }

    private getRandomLetter() {
        let char = this.config.abc[Math.floor(Math.random()*this.config.abc.length)];
        if (this.config.upperCase) {
            char = char.toUpperCase();
        }
        return char;
    }

    private easeIn(x) {
        return x*x;
    }

    private easeIn2(x) {
        return x*x*x;
    }

    private easeIn3(x) {
        return 1 - Math.sqrt(1 - Math.pow(x, 2));
    }

    private easeIn4(x) {
        return x*x*x*x;
    }

}
