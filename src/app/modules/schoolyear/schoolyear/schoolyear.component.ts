import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Member, Schoolyear } from '../../core/models';
import { MemberService } from '../../core/services';
import { SchoolyearService } from '../../core/services/schoolyear.service';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';
import { AddMemberToSchoolyearComponent } from '../dialog/add-member-to-schoolyear/add-member-to-schoolyear.component';
import { SchoolyearDialogComponent } from '../dialog/schoolyear-dialog/schoolyear-dialog.component';

@Component({
    selector: 'app-schoolyear',
    templateUrl: './schoolyear.component.html',
    styleUrls: ['./schoolyear.component.css']
})
export class SchoolyearComponent implements OnInit {
    public schoolyearColumns: string[] = [
        'id',
        'label',
        'startDate',
        'endDate',
        'actions',
    ]
    public membersColumns: string[] = [
        'name',
        'actions'
    ]
    public schoolyearLoading = false;
    public schoolyearDataSource: MatTableDataSource<Schoolyear>;
    public schoolyearMembersDataSource: MatTableDataSource<Member>;
    public selectedSchoolyear: Schoolyear;
    public allSchoolyears: Schoolyear[];

    constructor(
        private snack: MatSnackBar,
        private cd: ChangeDetectorRef,
        private dialog: MatDialog,
        private schoolyearService: SchoolyearService,
        private authService: AuthenticationService,
        private memberService: MemberService,
        ) { }

    ngOnInit() {
        this.schoolyearLoading = true;
        this.schoolyearService.getAllSchoolyears().subscribe(schoolyears => {
            this.allSchoolyears = schoolyears;
            this.schoolyearDataSource = new MatTableDataSource(schoolyears);
            this.schoolyearLoading = false;
            this.selectedSchoolyear = this.findSchoolyear(this.authService.getSchoolyear());
            this.selectSchoolyear(this.selectedSchoolyear.id)
        })
    }

    public addSchoolyear() {
        const dialogRef = this.dialog.open(SchoolyearDialogComponent);

        dialogRef.afterClosed().subscribe(reason => {
            if (reason) {
                this.schoolyearLoading = true;
                this.schoolyearService.addSchoolyear(reason).subscribe(res => {
                    this.snack.open('Školní rok vytvořen', 'X', { duration: 3000 });
                    this.refreshSchoolyear();
                    this.schoolyearLoading = false;
                })
            }
        })
    }

    public selectSchoolyear(schoolyearId) {
        this.memberService.getAllBySchoolyear(schoolyearId).subscribe(members => {
            this.schoolyearMembersDataSource = new MatTableDataSource(members);
            this.selectedSchoolyear = this.findSchoolyear(schoolyearId);
            
        })
    }

    public editSchoolyear(schoolyear) {
        const dialogRef = this.dialog.open(SchoolyearDialogComponent, { data: schoolyear});
        dialogRef.afterClosed().subscribe(schoolyear => {
            if (schoolyear) {
                this.schoolyearLoading = true;
                this.schoolyearService.update(schoolyear).subscribe(res => {
                    this.snack.open('Školní rok byla aktualizován', 'X', { duration: 3000 })
                    this.refreshSchoolyear();
                    this.schoolyearLoading = false;
                })
            }
        });
    }

    public addMemberToSchoolyear(schoolyear) {
        const dialogRef = this.dialog.open(AddMemberToSchoolyearComponent, { data: schoolyear});
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.schoolyearService.addMemberToSchoolyear(res.memberId, res.schoolyearId).subscribe(() => {
                    if (schoolyear.id === this.selectedSchoolyear.id) {
                        this.refreshMembers();
                    }
                    this.snack.open('Člen úspěšně přidán', 'X', { duration: 3000});
                })
            }
        })
    }

    public removeMemberFromSchoolyear(memberId) {
        const dialogRef = this.dialog.open(BasicDialogComponent);
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.schoolyearService.removeMemberFromSchoolyear(memberId, this.selectedSchoolyear.id).subscribe(() => {
                    this.refreshMembers();
                    this.snack.open('Člen úspěšně odebrán', 'X', { duration: 3000});
                });
            }
        });
    }

    public deleteSchoolyear(schoolyearId) {
        const dialogRef = this.dialog.open(BasicDialogComponent);
        dialogRef.afterClosed().subscribe(schoolyear => {
            if (schoolyear) {
                this.schoolyearLoading = true;
                this.schoolyearService.delete(schoolyearId).subscribe(res => {
                    this.snack.open('Školní rok odstraněn', 'X', { duration: 3000 });
                    if (schoolyearId === this.selectedSchoolyear.id) {
                        this.refreshSchoolyear();
                    }
                    this.schoolyearLoading = false;
                })
            }
        })
    }

    public findSchoolyear(schoolyearId): Schoolyear {
        return this.allSchoolyears.find(year => year.id === schoolyearId)
    }

    public refreshSchoolyear() {
        this.schoolyearService.getAllSchoolyears().subscribe(res => {
            this.schoolyearDataSource.data = res;
            this.allSchoolyears = res;
        });
        this.cd.detectChanges();
    }

    public refreshMembers() {
        this.selectSchoolyear(this.selectedSchoolyear.id);
    }

}
