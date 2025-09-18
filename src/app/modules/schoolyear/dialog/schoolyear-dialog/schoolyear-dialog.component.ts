import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'schoolyear-dialog',
    templateUrl: './schoolyear-dialog.component.html',
    imports: [
        FlexLayoutModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        FormsModule,
    ]
})
export class SchoolyearDialogComponent implements OnInit {
    public schoolyear: any = {
        id: null,
        label: null,
    };

    constructor(
        private dialogRef: MatDialogRef<SchoolyearDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { }

    public ngOnInit(): void {
        if (this.data) {
            this.schoolyear = this.data;
        }
    }

    public cancel() {
        this.dialogRef.close(null);
    }

    public submit() {
        this.dialogRef.close(this.schoolyear);
    }

}
