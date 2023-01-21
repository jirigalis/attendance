import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Points } from '../../core/models/points';
import { MemberService } from '../../core/services';
import { ReasonService } from '../../core/services/reason.service';

@Component({
    selector: 'add-bulk-points-dialog',
    templateUrl: './add-bulk-points-dialog.component.html',
    styleUrls: ['./add-bulk-points-dialog.component.scss'],
})
export class AddBulkPointsDialogComponent implements OnInit {
    points;
    selectedMembers = new FormControl();
    selectedReason;
    reasons;
    allMembers;
    result = [];

    constructor(
        private reasonService: ReasonService,
        private memberService: MemberService,
        private authService: AuthenticationService,
        private dialogRef: MatDialogRef<AddBulkPointsDialogComponent>
    ) {}

    ngOnInit(): void {
        this.memberService.listNames(this.authService.getSchoolyear()).subscribe((names) => {
            this.allMembers = names.filter((m) => m.role === 'D');
        });

        this.reasonService.getAll().subscribe((reasons) => {
            this.reasons = reasons;
        });
    }

    submit() {
        this.selectedMembers.value.forEach((id) => {
            this.result.push(
                new Points().deserialize({
                    points: this.points,
                    member_id: id,
                    reason_id: this.selectedReason,
                })
            );
        });

        this.dialogRef.close(this.result);
    }

    cancel() {
        this.dialogRef.close(null);
    }
}
