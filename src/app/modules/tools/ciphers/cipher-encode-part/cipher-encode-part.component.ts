import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'cipher-encode-part',
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        MatInputModule,
        MatSlideToggleModule,
        FormsModule,
    ],
    templateUrl: './cipher-encode-part.component.html',
})
export class CipherEncodePartComponent {
    @Output() public encodeEvent = new EventEmitter<string>();
    @Input() public input: string;
    @Input() public result: string;
    public fontSize: number;
    public liveEncoding: boolean = true;

    constructor() { }

    public keyUpEncode() {
        if (this.liveEncoding) {
            this.encodeEvent.emit(this.input);
        }
    }

    public encode() {
        this.encodeEvent.emit(this.input);
    }

}
