import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Badge } from '../../core/models/badge';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { LayoutDirective, LayoutGapDirective } from "@ngbracket/ngx-layout";

@Component({
    selector: 'badge-dialog',
    templateUrl: './badge-dialog.component.html',
    styleUrls: ['./badge-dialog.component.scss'],
    imports: [
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatIconModule,
        LayoutDirective,
        LayoutGapDirective,
    ],
})
export class BadgeDialogComponent implements OnInit {
    badge = new Badge();

    constructor(
        private dialogRef: MatDialogRef<BadgeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit(): void {
        this.badge = this.data !== null ? this.data : new Badge();
    }

    submit() {
        this.dialogRef.close(this.badge);
    }

    cancel() {
        this.dialogRef.close(null);
    }

    convertToFilename(badgeName) {
        badgeName = badgeName.toLowerCase().replaceAll(' ', '-');
        this.badge.logo = badgeName + '.png';
    }
}
