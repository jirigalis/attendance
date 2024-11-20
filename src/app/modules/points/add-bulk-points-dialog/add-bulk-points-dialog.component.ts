import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
    points: number | null = null;
    selectedMembers: any[] = [];
    selectedReason: number | null = null;
    reasons: any[] = [];
    allMembers: any[] = [];
    result: Points[] = [];
    created_at: Date | null = new Date();

    constructor(
        private reasonService: ReasonService,
        private memberService: MemberService,
        private authService: AuthenticationService,
        private dialogRef: MatDialogRef<AddBulkPointsDialogComponent>
    ) {}

    ngOnInit(): void {
        // Fetch members
        this.memberService.listNames(this.authService.getSchoolyear()).subscribe((names) => {
            this.allMembers = names
                .filter((m) => m.role === 'D')
                .sort((a, b) => a.name.localeCompare(b.name));
        });

        // Fetch reasons
        this.reasonService.getAll().subscribe((reasons) => {
            this.reasons = reasons;
        });
    }

    public onModelChange(event: any): void {
        this.selectedMembers = event;
    }

    submit(form: any): void {
        if (form.invalid) {
            return; // Prevent submission if the form is invalid
        }

        // Generate points for each selected member
        this.selectedMembers.forEach((member) => {
            this.result.push(
                new Points().deserialize({
                    points: this.points,
                    member_id: member.id,
                    reason_id: this.selectedReason,
                    created_at: this.created_at,
                })
            );
        });

        // Close the dialog with the result
        this.dialogRef.close(this.result);
    }

    cancel(): void {
        this.dialogRef.close(null); // Close the dialog without changes
    }
}