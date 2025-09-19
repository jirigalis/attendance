import { DatePipe, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { EVENT_POINTS } from '../../core/constants';
import { Member } from '../../core/models';
import { MemberService } from '../../core/services';
import { AttendanceService } from '../../core/services/attendance.service';
import { EventService } from '../../core/services/event.service';
import { PointsService } from '../../core/services/points.service';
import { KpiCardColor, KpiCardComponent, KpiCardSettings } from '../../shared/kpi-card/kpi-card.component';
import { Points } from "../../core/models/points";
import { BasicDialogComponent } from "../../shared/dialog/basic-dialog/basic-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Badge } from "../../core/models/badge";
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CustomDatePipe } from "../../shared/pipes/custom-date.pipe";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
    selector: 'edit-member',
    templateUrl: './edit-member.component.html',
    styleUrls: ['./edit-member.component.scss'],
    imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCardModule,
        KpiCardComponent,
        MatDatepickerModule,
        MatTabsModule,
        MatProgressBarModule,
        MatTableModule,
        MatSortModule,
        CustomDatePipe,
        MatTooltipModule,
        DatePipe,
        MatRadioModule,
        MatCheckboxModule,
    ],
})
export class EditMemberComponent implements OnInit {
    memberForm: FormGroup;
    member: Member;
    displayedColumns: string[] = ['reason', 'points', 'created_at', 'action'];
    dataSource: MatTableDataSource<any>;
    badgesColumns: string[] = ['badge_name', 'logo', 'created_at', 'action'];
    badgeDataSource: MatTableDataSource<any>;
    eventsColumns: string[] = ['name', 'startDate', 'endDate', 'description'];
    eventsDataSource: MatTableDataSource<any>;
    @ViewChild(MatSort) sort: MatSort;
    loading = false;
    memberId: number;

    kpiAttendancePoints: KpiCardSettings = {
        label: 'Počet bodů za docházku',
        value: 0,
        icon: 'event',
        color: KpiCardColor.AMBER,
    }

    kpiPoints: KpiCardSettings = {
        label: 'Počet bodů ze schůzek',
        value: 0,
        icon: 'timeline',
        color: KpiCardColor.DEEPORANGE,
    }

    kpiSumPoints: KpiCardSettings = {
        label: 'Celkový počet bodů',
        value: 0,
        icon: 'functions',
        color: KpiCardColor.INDIGO
    }

    kpiAttendancePercentage: KpiCardSettings = {
        label: 'Docházka',
        value: '',
        icon: 'percent',
    }

    kpiEvents: KpiCardSettings = {
        label: 'Počet akcí',
        value: 0,
        icon: 'event',
    }

    kpiEventsPoints: KpiCardSettings = {
        label: 'Počet bodů za akce',
        value: 0,
        icon: 'functions',
    }

    constructor(
        private fb: FormBuilder,
        private snack: MatSnackBar,
        private memberService: MemberService,
        private pointsService: PointsService,
        private eventService: EventService,
        private attendanceService: AttendanceService,
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private location: Location,
        private dialog: MatDialog,
    ) {
        this.memberForm = this.fb.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            address: [''],
            email: [''],
            contact: [''],
            rc: ['', Validators.minLength(10)],
            role: ['D', Validators.required],
            application: [],
            paid: [],
            id: [],
            schoolyearId: [this.authService.getSchoolyear()],
            requirements: [],
        });

        const routerParams = this.route.snapshot.paramMap;
        this.memberId = Number(routerParams.get('memberId'));
    }

    ngOnInit() {
        this.loading = true;

        this.memberService.getByIdAndSchoolyear(this.memberId, this.authService.getSchoolyear()).subscribe((res) => {
            this.member = res;
            this.memberForm.patchValue(res);
        });

        this.memberService.getBadges(this.memberId).subscribe((badges) => {
            this.badgeDataSource = new MatTableDataSource(badges);
        });

        const points$ = this.pointsService.getByMemberAndSchoolyear(this.memberId, this.authService.getSchoolyear());
        const attendancePoints$ = this.attendanceService.getMembersAttendancePoints(this.memberId, this.authService.getSchoolyear());
        const attendancePercentage$ = this.memberService.getAttendanceById(this.memberId, this.authService.getSchoolyear());
        const meetingCount$ = this.attendanceService.getAllDatesBySchoolyear(this.authService.getSchoolyear());
        const events$ = this.eventService.getByMemberAndSchoolyear(this.memberId, this.authService.getSchoolyear());

        forkJoin([points$, attendancePoints$, attendancePercentage$, meetingCount$, events$]).subscribe(result => {
            // prepare datasource for mat-table
            this.dataSource = new MatTableDataSource(result[0]);
            this.dataSource.sort = this.sort;
            this.loading = false;

            // calculate sum
            let sum = 0;
            result[0].forEach((obj) => sum += parseInt(obj.points));
            this.kpiPoints.value = sum;

            //calculate overall sum (attendance points, events points and points)  
            this.kpiAttendancePoints.value = Number(result[1]);
            this.kpiSumPoints.value = sum + Number(result[1]) + Number(result[4].length * EVENT_POINTS);

            //attendance percentage
            this.kpiAttendancePercentage.value = Math.floor((((<Array<any>>result[2]).length / result[3].length ) || 0) * 100) + ' %'

            // Events KPI
            this.kpiEvents.value = result[4].length;
            this.kpiEventsPoints.value = result[4].length * EVENT_POINTS;
            this.eventsDataSource = new MatTableDataSource(result[4]);
        })
    }

    goBack() {
        this.location.back();
    }

    onSubmit() {
        if (this.memberForm.valid) {
            this.memberService.update(this.memberForm.value).subscribe(
                {
                    next: (res) => {
                        this.snack.open('Změny úspěšně uloženy.', 'X', {
                            duration: 3000,
                        });
                    },
                    error: (err) => {
                        this.snack.open('Během ukládání změn nastala chyba.', 'X', {
                            duration: 3000,
                        });
                    }
                }
            );
        }
    }

    deletePoints(points: Points): void {
        const dialogRef = this.dialog.open(BasicDialogComponent);
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.pointsService.delete(points.id).subscribe(() => {
                    this.snack.open('Body odstraněny', 'X', {
                        duration: 3000,
                    });
                    this.ngOnInit();
                });
            }
        })
    }

    deleteBadge(badge: Badge): void {
        const dialogRef = this.dialog.open(BasicDialogComponent);
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.memberService.removeBadge(this.memberId, badge.id).subscribe(() => {
                    this.snack.open('Odznak odstraněn', 'X', {
                        duration: 3000,
                    });
                    this.ngOnInit();
                });
            }
        })
    }
}