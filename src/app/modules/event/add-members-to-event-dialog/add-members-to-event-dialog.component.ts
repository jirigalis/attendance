import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { MemberService } from '../../core/services';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { FlexDirective, FlexFillDirective, LayoutAlignDirective, LayoutDirective } from "@ngbracket/ngx-layout";
import { TransferListComponent } from "../../shared/transfer-list/transfer-list.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Member } from "../../core/models";

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
        FlexDirective,
        FlexFillDirective,
        LayoutAlignDirective,
        LayoutDirective,
        MatProgressSpinnerModule,
        TransferListComponent,
    ],
})
export class AddMembersToEventDialogComponent implements OnInit {
    members: Member[];
    public selectedMembers: Member[] = [];
    listConfig = {
        getLabel: (s) => s.name + ' ' + s.surname,
        selectedOptionsLabel: 'Přidaní členové',
        showCounter: true,
    }

    constructor(
        private memberService: MemberService,
        private a: AuthenticationService,
        private dialogRef: MatDialogRef<AddMembersToEventDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { }

    ngOnInit() {
        if (this.data) {
            this.members = this.data.allMembers.sort((a, b) => a.name.localeCompare(b.name));
            this.selectedMembers = this.data.selectedMembers.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    submit() {
        this.dialogRef.close(this.selectedMembers);
    }

    cancel() {
        this.dialogRef.close(null);
    }
}
