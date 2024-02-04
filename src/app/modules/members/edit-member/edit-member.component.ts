import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Member } from '../../core/models';
import { MemberService } from '../../core/services';
import { AttendanceService } from '../../core/services/attendance.service';
import { PointsService } from '../../core/services/points.service';
import { KpiCardColor, KpiCardSettings } from '../../shared/kpi-card/kpi-card.component';

@Component({
    selector: 'edit-member',
    templateUrl: './edit-member.component.html',
    styleUrls: ['./edit-member.component.scss'],
})
export class EditMemberComponent implements OnInit {
    memberForm: FormGroup;
    member: Member;
    displayedColumns: string[] = ['reason', 'points', 'created_at'];
    dataSource: MatTableDataSource<any>;
    badgesColumns: string[] = ['badge_name', 'logo', 'created_at'];
    badgeDataSource: MatTableDataSource<any>;
    @ViewChild(MatSort) sort: MatSort;
    loading = false;
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

    constructor(
        private fb: FormBuilder,
        private snack: MatSnackBar,
        private memberService: MemberService,
        private pointsService: PointsService,
        private attendanceService: AttendanceService,
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private location: Location
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
    }

    ngOnInit() {
        this.loading = true;
        const routerParams = this.route.snapshot.paramMap;
        const memberId = Number(routerParams.get('memberId'));

        this.memberService.getByIdAndSchoolyear(memberId, this.authService.getSchoolyear()).subscribe((res) => {
            this.member = res;
            this.memberForm.patchValue(res);
        });

        this.memberService.getBadges(memberId).subscribe((badges) => {
            this.badgeDataSource = new MatTableDataSource(badges);
        });

        const points$ = this.pointsService.getByMember(memberId);
        const attendancePoints$ = this.attendanceService.getMembersAttendancePoints(memberId, this.authService.getSchoolyear());
        const attendancePercentage$ = this.memberService.getAttendanceById(memberId, this.authService.getSchoolyear());
        const meetingCount$ = this.attendanceService.getAllDatesBySchoolyear(this.authService.getSchoolyear());
        
        forkJoin([points$, attendancePoints$, attendancePercentage$, meetingCount$]).subscribe(result => {
            // prepare datasource for mat-table
            this.dataSource = new MatTableDataSource(result[0]);
            this.dataSource.sort = this.sort;
            this.loading = false;
            
            // calculate sum
            let sum = 0;
            result[0].forEach((obj) => sum  += parseInt(obj.points));
            this.kpiPoints.value = sum;
            
            //calculate overall sum (attendance points and points)  
            this.kpiAttendancePoints.value = Number(result[1]);
            this.kpiSumPoints.value = sum + Number(result[1]);

            //attendance percentage
            this.kpiAttendancePercentage.value = Math.floor(((<Array<any>>result[2]).length / result[3].length) * 100) + ' %'
        })
    }

    goBack() {
        this.location.back();
    }

    onSubmit() {
        if (this.memberForm.valid) {
            this.memberService.update(this.memberForm.value).subscribe(
                (res) => {
                    this.snack.open('Změny úspěšně uloženy.', 'X', {
                        duration: 3000,
                    });
                },
                (err) => {
                    this.snack.open('Během ukládání změn nastala chyba.', 'X', {
                        duration: 3000,
                    });
                }
            );
        }
    }
}
