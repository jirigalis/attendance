import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";

@Component({
    selector: 'basic-dialog',
    templateUrl: './basic-dialog.component.html',
    styleUrls: ['./basic-dialog.component.scss'],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        FlexLayoutModule,
    ],
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
