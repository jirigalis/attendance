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
import { PointsService } from '../../core/services/points.service';

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

    constructor(
        private fb: FormBuilder,
        private snack: MatSnackBar,
        private memberService: MemberService,
        private pointsService: PointsService,
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
        });
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
