import { Component, effect, EventEmitter, input, OnInit, Output, signal } from '@angular/core';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";

export interface TransferListConfig {
    getLabel: (item: any) => string;
    selectedOptionsLabel?: string; // if true, show labels on selected options
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
export class TransferListComponent implements OnInit {
    public availableOptions = input<any[]>([]);
    public selectedOptions = input<any[]>([]);
    public config = input<TransferListConfig>();
    @Output() public selectedOptionsChange = new EventEmitter<any[]>();

    public filteredAvailableOptions = signal<any[]>([]);
    protected internalSelectedOptions = signal<any[]>([]);

    constructor() {
        effect(() => {
            this.internalSelectedOptions.set(this.selectedOptions());
        });

        // filter available options to exclude selected options
        effect(() => {
            const available = this.availableOptions();
            const selected = this.selectedOptions();

            const filtered = available.filter(option =>
                !selected.some(selectedOption => selectedOption.id === option.id)
            );
            this.filteredAvailableOptions.set(filtered);
        })
    }

    ngOnInit(): void {

        console.log('Available options:', this.availableOptions());
        console.log('Selected options:', this.selectedOptions());
    }

    public itemClicked(item) {
        const selectedIndex = this.internalSelectedOptions().findIndex(o => o.id === item.id);

        if (selectedIndex > -1) {
            this.internalSelectedOptions.update(selected => selected.filter(o => o.id !== item.id));
        } else {
            this.internalSelectedOptions.update(selected => [...selected, item]);
        }

        this.selectedOptionsChange.emit(this.internalSelectedOptions());

        /*const allOptionsIndex = this.availableOptions().findIndex(op => op.id === item.id);
        const selectedIndex = this.selectedOptions().findIndex(op => op.id === item.id);
        if (selectedIndex > -1) {
            this.selectedOptions().splice(selectedIndex, 1);
            this.availableOptions().push(item);
        } else {
            this.availableOptions().splice(allOptionsIndex, 1);
            this.selectedOptions().push(item);
        }*/
    }

    public selectAll() {
        this.internalSelectedOptions.update(selected => [
            ...selected,
            ...this.filteredAvailableOptions(),
        ]);

        this.selectedOptionsChange.emit(this.internalSelectedOptions());
    }

    public clear() {
        this.internalSelectedOptions.set([]);
        this.selectedOptionsChange.emit(this.internalSelectedOptions());
    }

}