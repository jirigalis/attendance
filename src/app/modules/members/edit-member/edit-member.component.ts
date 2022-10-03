import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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
    attendancePoints;
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

        this.pointsService.getByMember(memberId).subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.loading = false;
            let sum = 0;
            data.forEach((obj) => sum  += parseInt(obj.points));
            this.kpiPoints.value = sum;            
            this.kpiSumPoints.value = sum;            
        });

        this.attendanceService.getMembersAttendancePoints(memberId).subscribe(points => {
            this.attendancePoints = points;
            this.kpiAttendancePoints.value = points;
            this.kpiSumPoints.value +=points;
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
