import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Reason } from '../../core/models/reason';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'add-reason',
    templateUrl: './add-reason.component.html',
    styleUrls: ['./add-reason.component.scss'],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
    ],
})
export class AddReasonComponent implements OnInit {
    reason = new Reason();

    constructor(
        private dialogRef: MatDialogRef<AddReasonComponent>,
        @Inject(MAT_DIALOG_DATA) public data
        ) { }

    ngOnInit(): void {
        this.reason = this.data !== null ? this.data : new Reason();
    }

    submit() {
        this.dialogRef.close(this.reason);
    }

    cancel() {
        this.dialogRef.close(null);
    }

}
