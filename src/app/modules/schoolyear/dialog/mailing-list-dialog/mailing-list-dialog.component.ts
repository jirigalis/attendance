import { Component, Inject, OnInit } from "@angular/core";
import { Member } from "../../../core/models";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
    selector: 'mailing-list-dialog',
    templateUrl: './mailing-list-dialog.component.html',
})
export class MailingListDialogComponent {
    public selectedMembers: Member[] = [];
    public membersSelected: boolean = false;
    public listConfig = {
        getLabel: (s) => s.name + ' ' + s.surname,
    }
    public copied: boolean = false;

    constructor(
        private dialogRef: MatDialogRef<MailingListDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public members: Member[],
    ) { }

    public getEmails(): string {
        // clear empty emails
        const nonEmptyMembers = this.selectedMembers.filter(m => m.email !== '' || m.email !== null || m.email !== undefined);

        // clear dupliactes
        const uniqueMembers = nonEmptyMembers.filter((m, i, self) =>
            i === self.findIndex((t) => (t.email === m.email))
        );

        return uniqueMembers.filter(m => m.email !== '').map((m) => m.email).join(', ');
    }

    public cancel(): void {
        this.dialogRef.close(null);
    }

    public back(): void {
        this.membersSelected = false;
    }

    public proceed(): void {
        this.membersSelected = true;
    }

    public copyValues(): void {
        this.copied = true
        navigator.clipboard.writeText(this.getEmails());
        setTimeout(() => {
            this.copied = false;
        }, 1500)
    }
}