import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberService } from '../../core/services';
import { BadgeService } from '../../core/services/badge.service';

@Component({
    selector: 'add-badge-dialog',
    templateUrl: './add-badge-dialog.component.html',
    styleUrls: ['./add-badge-dialog.component.scss'],
})
export class AddBadgeDialogComponent implements OnInit {
    result = {
        member_id: null,
        badge_id: null,
    };
    badges;
    allMembers;

    constructor(
        private badgeService: BadgeService,
        private memberService: MemberService,
        private dialogRef: MatDialogRef<AddBadgeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        this.memberService.getAll().subscribe((members) => {
            this.allMembers = members;
        });
        this.badgeService.getAll().subscribe((badges) => {
            this.badges = badges;
        });
    }

    submit() {
        this.dialogRef.close(this.result);
    }

    cancel() {
        this.dialogRef.close(null);
    }
}
