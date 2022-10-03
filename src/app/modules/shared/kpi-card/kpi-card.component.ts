import { Component, Input, OnInit } from '@angular/core';

export interface KpiCardSettings {
    label: string;
    value: any;
    icon: string;
    color: KpiCardColor;
}

export enum KpiCardColor {
    RED = 'red',
    PINK = '',
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
    styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent implements OnInit {
    @Input() settings: KpiCardSettings;

    constructor() { }

    ngOnInit() {
    }

}
