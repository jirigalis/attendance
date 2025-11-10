import { Component, Input, OnInit, signal } from '@angular/core';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

export interface KpiCardSettings {
    label: string;
    value: any;
    icon?: string;
    color?: KpiCardColor;
}

export enum KpiCardColor {
    RED = 'red',
    PINK = 'pink',
    PURPLE = 'purple',
    DEEPPURPLE = 'deeppurple',
    INDIGO = 'indigo',
    BLUE = 'blue',
    LIGHTBLUE = 'lightblue',
    CYAN = 'cyan',
    TEAL = 'teal',
    GREEN = 'green',
    LIGHTGREEN = 'lightgreen',
    LIME = 'lime',
    YELLOW = 'yellow',
    AMBER = 'amber',
    ORANGE = 'orange',
    DEEPORANGE = 'deeporange',
    BROWN = 'brown',
    GRAY = 'gray',
    BLUEGRAY = 'bluegray',
}

@Component({
    selector: 'kpi-card',
    templateUrl: './kpi-card.component.html',
    imports: [
        FlexLayoutModule,
        MatCardModule,
        MatIconModule,
    ],
    styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent implements OnInit {
    @Input() settings: KpiCardSettings;
    color = signal<KpiCardColor>(KpiCardColor.AMBER);

    constructor() { }

    ngOnInit() {
        if (!this.settings.icon) {
            this.settings.icon = 'bar_chart';
        }

        if (!this.settings.color) {
            const enumValues = Object.values(KpiCardColor);
            this.color.set(enumValues[Math.floor(Math.random() * (Object.keys(KpiCardColor).length))]);
        } else {
            this.color.set(this.settings.color);
        }
    }

}
