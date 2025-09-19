import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Member, Schoolyear } from 'src/app/modules/core/models';
import { MemberService } from 'src/app/modules/core/services';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { TransferListComponent } from "../../../shared/transfer-list/transfer-list.component";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FlexDirective, FlexFillDirective, LayoutAlignDirective, LayoutDirective } from "@ngbracket/ngx-layout";

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
        MatProgressSpinnerModule,
        FlexDirective,
        LayoutDirective,
        LayoutAlignDirective,
        FlexFillDirective,
    ]
})
export class AddMemberToSchoolyearComponent implements OnInit {
    public schoolyear: Schoolyear;
    public members: Member[];
    public selectedMembers: Member[] = [];
    public selectedMember: Member;
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
            this.schoolyear = this.data.schoolyear;
            this.selectedMembers = this.data.selectedMembers;
        }
        this.memberService.getAll().subscribe(members => {
            this.members = members.sort((a, b) => a.name.localeCompare(b.name));
        })
    }

    public cancel() {
        this.dialogRef.close(null);
    }

    public submit() {
        this.dialogRef.close({ schoolyearId: this.schoolyear.id, members: this.selectedMembers});
    }

}
