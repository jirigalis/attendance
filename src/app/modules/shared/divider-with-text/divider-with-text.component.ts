import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from "@angular/material/divider";

@Component({
    selector: 'divider-with-text',
    templateUrl: './divider-with-text.component.html',
    styleUrls: ['./divider-with-text.component.scss'],
    imports: [
        MatDividerModule
    ]
})
export class DividerWithTextComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}
