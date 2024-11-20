import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberService } from '../../core/services';
import { BadgeService } from '../../core/services/badge.service';
import { Badge } from "../../core/models/badge";
import { AuthenticationService } from "../../core/authentication/authentication.service";

@Component({
    selector: 'add-badge-dialog',
    templateUrl: './add-badge-dialog.component.html',
    styleUrls: ['./add-badge-dialog.component.scss'],
})
export class AddBadgeDialogComponent implements OnInit {
    result: any;
    badges: Badge[];
    selectedBadge: Badge;
    allMembers;
    selectedMembers = [];
    created_at: Date | null = new Date();

    constructor(
        private badgeService: BadgeService,
        private memberService: MemberService,
        private authService: AuthenticationService,
        private dialogRef: MatDialogRef<AddBadgeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        this.memberService.listNames(this.authService.getSchoolyear()).subscribe((members) => {
            this.allMembers = members.sort((a, b) => a.name.localeCompare(b.name));
        });
        this.badgeService.getAll().subscribe((badges) => {
            this.badges = badges;
        });
    }

    public onModelChange(event) {
        this.selectedMembers = event;
    }

    submit(form: any) {
        if (form.invalid) {
            return;
        }

        this.result = {
            members: this.selectedMembers,
            badge: this.selectedBadge,
            created_at: this.created_at,
        }

        this.dialogRef.close(this.result);
    }

    cancel() {
        this.dialogRef.close(null);
    }
}