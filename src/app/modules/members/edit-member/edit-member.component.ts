import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from '../../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../core/models';
import { MatTableDataSource } from '@angular/material/table';
import { PointsService } from '../../core/services/points.service';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'edit-member',
    templateUrl: './edit-member.component.html',
    styleUrls: ['./edit-member.component.scss'],
})
export class EditMemberComponent implements OnInit {
    memberForm: FormGroup;
    member: Member;
    displayedColumns: string[] = ['reason', 'points', 'date'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatSort) sort: MatSort;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private snack: MatSnackBar,
        private memberService: MemberService,
        private pointsService: PointsService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.memberForm = this.fb.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            address: [''],
            contact: [''],
            rc: ['', Validators.minLength(10)],
            role: ['D', Validators.required],
            application: [],
            paid: [],
            gdpr: [],
            id: [],
        });
    }

    ngOnInit() {
        this.loading = true;
        const routerParams = this.route.snapshot.paramMap;
        const memberId = Number(routerParams.get('memberId'));

        this.memberService.getById(memberId).subscribe((res) => {
            this.member = res;
            this.memberForm.patchValue(res);
        });

        this.pointsService.getByMember(memberId).subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.loading = false;
        });
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
