import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member, Schoolyear } from 'src/app/modules/core/models';
import { MemberService } from 'src/app/modules/core/services';

@Component({
    selector: 'app-add-member-to-schoolyear',
    templateUrl: './add-member-to-schoolyear.component.html',
})
export class AddMemberToSchoolyearComponent implements OnInit {
    public schoolyear: Schoolyear;
    public members: Member[];
    public selectedMember;

    constructor(
        private dialogRef: MatDialogRef<AddMemberToSchoolyearComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private memberService: MemberService,
    ) { }

    ngOnInit() {
        if (this.data) {
            this.schoolyear = this.data;
        }
        this.memberService.getAll().subscribe(members => {
            this.members = members;
        })
    }

    public cancel() {
        this.dialogRef.close(null);
    }

    public submit() {
        this.dialogRef.close({ schoolyearId: this.schoolyear.id, memberId: this.selectedMember});
    }

}
