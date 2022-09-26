import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Points } from '../../core/models/points';
import { MemberService } from '../../core/services';
import { ReasonService } from '../../core/services/reason.service';

@Component({
    selector: 'add-points-dialog',
    templateUrl: './add-points-dialog.component.html',
    styleUrls: ['./add-points-dialog.component.scss'],
})
export class AddPointsDialogComponent implements OnInit {
    points: Points = new Points();
    reasons;
    allMembers;

    constructor(
        private reasonService: ReasonService,
        private memberService: MemberService,
        private authService: AuthenticationService,
        private dialogRef: MatDialogRef<AddPointsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        this.memberService.listNames(this.authService.getSchoolyear()).subscribe((names) => {
            this.allMembers = names;
            if (this.data != null) {
                this.points.member_id = this.data.member_id;
            }
        });

        this.reasonService.getAll().subscribe((reasons) => {
            this.reasons = reasons;
        });
    }

    submit() {
        this.dialogRef.close(this.points);
    }

    cancel() {
        this.dialogRef.close(null);
    }
}
