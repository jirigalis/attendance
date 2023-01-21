import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'transfer-list',
    templateUrl: './transfer-list.component.html',
    styleUrls: ['./transfer-list.component.scss']
})
export class TransferListComponent implements OnInit {
    @Input() public allOptions: any[] = [];
    @Input() public selectedOptions: any[] = [];
    @Input() public config: any;

    constructor() { }

    ngOnInit() {
    }

    public itemClicked(item) {
        const allOptionsIndex = this.allOptions.findIndex(op => op.id === item.id);
        const selectedIndex = this.selectedOptions.findIndex(op => op.id === item.id);
        if (selectedIndex > -1) {
            this.selectedOptions.splice(selectedIndex, 1);
            this.allOptions.push(item);
        } else {
            this.allOptions.splice(allOptionsIndex, 1);
            this.selectedOptions.push(item);
        }
    }

    public selectAll() {
        this.allOptions.forEach(item => {
            this.selectedOptions.push(item);
        })
        this.allOptions.length = 0;
    }

    public clear() {
        this.allOptions = this.allOptions.concat(this.selectedOptions);
        this.selectedOptions.length = 0;
    }

}
