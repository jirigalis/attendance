import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MemberService } from '../../core/services';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';

@Component({
    selector: 'members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = [
        'name',
        'role',
        'age',
        'address',
        'contact',
        'application',
        'paid',
        'actions',
    ];
    loading = false;
    dataSource;

    constructor(
        private memberService: MemberService,
        private router: Router,
        private snack: MatSnackBar,
        private changeDetectorRefs: ChangeDetectorRef,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.loading = true;
        this.memberService.getAll().subscribe((members: any) => {
            members.map((m) => (m.age = this.getAge(m.rc)));
            this.dataSource = new MatTableDataSource(members);
            this.loading = false;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    addMember() {
        this.router.navigate(['/add-member']);
    }

    deleteMember(member) {
        this.loading = true;
        this.memberService.delete(member.id).subscribe(
            (res) => {
                this.snack.open('Member successfully deleted.', 'X', {
                    duration: 3000,
                });
                this.refresh();
                this.loading = false;
            },
            (err) => {
                this.snack.open('Error during deleting this member', 'X', {
                    duration: 3000,
                });
                this.loading = false;
            }
        );
    }

    openDialog(member) {
        const dialogRef = this.dialog.open(BasicDialogComponent);

        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.deleteMember(member);
            }
        });
    }

    editMember(memberId) {
        this.router.navigate(['/edit-member', memberId]);
    }

    refresh() {
        this.memberService.getAll().subscribe((res) => {
            this.dataSource.data = res;
            this.dataSource.sort = this.sort;
        });
        this.changeDetectorRefs.detectChanges();
    }

    getAge(rc) {
        return MemberService.getAgeFromRC(rc);
    }
}
