import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { MemberService } from '../../core/services';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';
import { MailingListDialogComponent } from "../dialog/mailing-list-dialog/mailing-list-dialog.component";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule, DatePipe } from "@angular/common";

@Component({
    selector: 'schoolyear-members',
    templateUrl: './schoolyear-members.component.html',
    styleUrls: ['./schoolyear-members.component.scss'],
    imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        RouterModule,
        MatProgressBarModule,
        MatIconModule,
        DatePipe,
        CommonModule,
    ],
})
export class SchoolyearMembersComponent implements OnInit {
    @ViewChild(MatSort) public sort: MatSort;
    displayedColumns: string[] = [
        'name',
        'age',
        'birthday',
        'address',
        'contact',
        'email',
        'application',
        'paid',
    ];
    loading = false;
    dataSource;

    constructor(
        private memberService: MemberService,
        private authService: AuthenticationService,
        private r: Router,
        private snack: MatSnackBar,
        private cd: ChangeDetectorRef,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.loading = true;
        this.memberService.getAllBySchoolyear(this.authService.getSchoolyear()).subscribe((members: any) => {
            members.map((m) => { 
                m.age = this.getAge(m.rc);
                m.birthday = this.getBirthday(m.rc)
            });
            this.dataSource = new MatTableDataSource(members);
            this.dataSource.sort = this.sort;
            this.loading = false;
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    createEmailList() {
        this.dialog.open(MailingListDialogComponent, { width: '700px', data: this.dataSource.data });
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
        this.r.navigate(['/edit-member', memberId]);
    }

    refresh() {
        this.memberService.getAll().subscribe((res) => {
            this.dataSource.data = res;
            this.dataSource.sort = this.sort;
        });
        this.cd.detectChanges();
    }

    getAge(rc) {
        return MemberService.getAgeFromRC(rc);
    }

    getBirthday(rc) {
        return MemberService.getBirthdayFromRC(rc);
    }

}