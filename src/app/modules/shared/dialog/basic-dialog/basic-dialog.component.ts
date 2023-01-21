import {
    ChangeDetectionStrategy, Component, Inject, OnInit
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'basic-dialog',
    templateUrl: './basic-dialog.component.html',
    styleUrls: ['./basic-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicDialogComponent implements OnInit {
    description: string;

    constructor(
        private dialogRef: MatDialogRef<BasicDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) { }

    ngOnInit() { }

    close(val) {
        this.dialogRef.close(val);
    }
}
