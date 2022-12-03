import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { MemberService } from '../../core/services';

@Component({
    selector: 'app-add-members-to-event-dialog',
    templateUrl: './add-members-to-event-dialog.component.html',
    styleUrls: ['./add-members-to-event-dialog.component.css']
})
export class AddMembersToEventDialogComponent implements OnInit {
    selectedMembers = new FormControl();
    allMembers;

    constructor(
        private memberService: MemberService,
        private a: AuthenticationService,
        private dialogRef: MatDialogRef<AddMembersToEventDialogComponent>
    ) { }

    ngOnInit() {
        this.memberService.listNames(this.a.getSchoolyear()).subscribe(members => {
            this.allMembers = members;
        })
    }

    submit() {
        this.dialogRef.close(this.selectedMembers.value);
    }

    cancel() {
        this.dialogRef.close(null);
    }
}
