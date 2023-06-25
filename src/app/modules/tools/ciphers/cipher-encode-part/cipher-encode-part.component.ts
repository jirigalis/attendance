import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'cipher-encode-part',
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
