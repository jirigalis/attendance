import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Member, Schoolyear } from 'src/app/modules/core/models';
import { MemberService } from 'src/app/modules/core/services';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { TransferListComponent } from "../../../shared/transfer-list/transfer-list.component";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-add-member-to-schoolyear',
    templateUrl: './add-member-to-schoolyear.component.html',
    imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        TransferListComponent,
        MatIconModule,
    ]
})
export class AddMemberToSchoolyearComponent implements OnInit {
    public schoolyear: Schoolyear;
    public members: Member[];
    public selectedMembers = [];
    public selectedMember;
    listConfig = {
        getLabel: (s) => s.name + ' ' + s.surname,
        selectedOptionsLabel: 'Přidaní členové',
        showCounter: true,
    }

    constructor(
        private dialogRef: MatDialogRef<AddMemberToSchoolyearComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private memberService: MemberService,
    ) { }

    ngOnInit() {
        if (this.data) {
            console.log(this.data);
            this.schoolyear = this.data.schoolyear;
            this.selectedMembers = this.data.selectedMembers;
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
