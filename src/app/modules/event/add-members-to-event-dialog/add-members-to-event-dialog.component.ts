import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { MemberService } from '../../core/services';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-add-members-to-event-dialog',
    templateUrl: './add-members-to-event-dialog.component.html',
    styleUrls: ['./add-members-to-event-dialog.component.css'],
    imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatIconModule,
    ],
})
export class AddMembersToEventDialogComponent implements OnInit {
    selectedMembers = new FormControl();
    allMembers;

    constructor(
        private memberService: MemberService,
        private a: AuthenticationService,
        private dialogRef: MatDialogRef<AddMembersToEventDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { }

    ngOnInit() {
        this.memberService.listNames(this.a.getSchoolyear()).subscribe(members => {
            this.allMembers = members.filter(m => !this.data.includes(m.id))
        })
    }

    submit() {
        this.dialogRef.close(this.selectedMembers.value);
    }

    cancel() {
        this.dialogRef.close(null);
    }
}
