import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { ReasonService } from '../../core/services/reason.service';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';
import { AddReasonComponent } from '../add-reason/add-reason.component';

@Component({
    selector: 'reason',
    templateUrl: './reason.component.html',
    styleUrls: ['./reason.component.scss']
})
export class ReasonComponent implements OnInit {
    displayedColumns: string[] = [
        'id',
        'name',
        'actions',
    ];
    loading = false;
    dataSource;

    constructor(
        private reasonService: ReasonService,
        private snack: MatSnackBar,
        private changeDetectorRefs: ChangeDetectorRef,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.loading = true;
        this.reasonService.getAll().subscribe(reasons => {
            this.dataSource = new MatTableDataSource(reasons);
            this.loading = false;
        })
    }

    addReason() {
        const dialogRef = this.dialog.open(AddReasonComponent)

        dialogRef.afterClosed().subscribe(reason => {
            if (reason !== null) {
                this.loading = true;
                this.reasonService.add(reason).subscribe(res => {
                    this.snack.open('Kategorie vytvořena', 'X', { duration: 3000 });
                    this.refresh();
                    this.loading = false;
                })
            }
        })
    } 

    editReason(reason) {
        const dialogRef = this.dialog.open(AddReasonComponent, { data: reason});
        dialogRef.afterClosed().subscribe(reason => {
            if (reason) {
                this.loading = true;
                this.reasonService.update(reason).subscribe(res => {
                    this.snack.open('Kategorie byla aktualizována', 'X', { duration: 3000 })
                    this.refresh();
                    this.loading = false;
                })
            }
        });
    }

    deleteReason(reasonId) {
        const dialogRef = this.dialog.open(BasicDialogComponent);
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.loading = true;
                this.reasonService.delete(reasonId).subscribe(res2 => {
                    this.snack.open('Kategorie odstraněna', 'X', { duration: 3000 });
                    this.refresh();
                    this.loading = false;
                })
            }
        })
    }

    private refresh() {
        this.reasonService.getAll().subscribe(res => {
            this.dataSource.data = res;
        });
        this.changeDetectorRefs.detectChanges();
    }

}
