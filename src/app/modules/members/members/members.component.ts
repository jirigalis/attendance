import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { MemberService } from '../../core/services';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
    selector: 'members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
    imports: [
        FlexLayoutModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatProgressBarModule,
        MatIconModule,
        MatTooltipModule,
        RouterModule,
    ]
})
export class MembersComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = [
        'name',
        'role',
        'age',
        'address',
        'contact',
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
