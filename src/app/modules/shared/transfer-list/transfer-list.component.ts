import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";

export interface TransferListConfig {
    getLabel: (item: any) => string;
    selectedOptionsLabel?: boolean; // if true, show labels on selected options
    showCounter?: boolean; // if true, show counter on selected options
    height?: string; // height of the lists
    allOptionsLabel?: string; // label for all options list
}

@Component({
    selector: 'transfer-list',
    templateUrl: './transfer-list.component.html',
    imports: [
        FlexLayoutModule,
        MatListModule,
        MatButtonModule,
    ],
    styleUrls: ['./transfer-list.component.scss']
})
export class TransferListComponent {
    @Input() public availableOptions: any[] = [];
    @Input() public selectedOptions: any[] = [];
    @Input() public config: TransferListConfig;
    @Output() public selectedOptionsChange = new EventEmitter<any[]>();

    constructor() { }

    public itemClicked(item) {
        const allOptionsIndex = this.availableOptions.findIndex(op => op.id === item.id);
        const selectedIndex = this.selectedOptions.findIndex(op => op.id === item.id);
        if (selectedIndex > -1) {
            this.selectedOptions.splice(selectedIndex, 1);
            this.availableOptions.push(item);
        } else {
            this.availableOptions.splice(allOptionsIndex, 1);
            this.selectedOptions.push(item);
        }
    }

    public selectAll() {
        this.availableOptions.forEach(item => {
            this.selectedOptions.push(item);
        })
        this.availableOptions.length = 0;
    }

    public clear() {
        this.availableOptions = this.availableOptions.concat(this.selectedOptions);
        this.selectedOptions.length = 0;
    }

}