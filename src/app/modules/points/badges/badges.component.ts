import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { BadgeService } from '../../core/services/badge.service';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';
import { BadgeDialogComponent } from '../badge-dialog/badge-dialog.component';

@Component({
    selector: 'badge',
    templateUrl: './badges.component.html',
    styleUrls: ['./badges.component.scss'],
})
export class BadgesComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'logo', 'actions'];
    loading = false;
    dataSource;

    constructor(
        private badgeService: BadgeService,
        private snack: MatSnackBar,
        private changeDetectorRefs: ChangeDetectorRef,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.loading = true;
        this.badgeService.getAll().subscribe((badges) => {
            this.dataSource = new MatTableDataSource(badges);
            this.loading = false;
        });
    }

    addBadge() {
        const dialogRef = this.dialog.open(BadgeDialogComponent);

        dialogRef.afterClosed().subscribe((badge) => {
            if (badge) {
                this.loading = true;
                this.badgeService.add(badge).subscribe((res) => {
                    this.snack.open('Odznak vytvořen', 'X', { duration: 3000 });
                    this.refresh();
                    this.loading = false;
                });
            }
        });
    }

    editBadge(badge) {
        const dialogRef = this.dialog.open(BadgeDialogComponent, {
            data: badge,
        });
        dialogRef.afterClosed().subscribe((badge) => {
            if (badge) {
                this.loading = true;
                this.badgeService.update(badge).subscribe((res) => {
                    this.snack.open('Odznak byl aktualizován', 'X', {
                        duration: 3000,
                    });
                    this.refresh();
                    this.loading = false;
                });
            }
        });
    }

    deleteBadge(badgeId) {
        const dialogRef = this.dialog.open(BasicDialogComponent);
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.loading = true;
                this.badgeService.delete(badgeId).subscribe((res2) => {
                    this.snack.open('Odznak byl odstraněn', 'X', {
                        duration: 3000,
                    });
                    this.refresh();
                    this.loading = false;
                });
            }
        });
    }

    private refresh() {
        this.badgeService.getAll().subscribe((res) => {
            this.dataSource.data = res;
        });
        this.changeDetectorRefs.detectChanges();
    }
}
