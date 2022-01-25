import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../core/models';
import { MemberService } from '../../core/services';

@Component({
    selector: 'member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit {
    member?: Member;
    constructor(
        private memberService: MemberService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.memberService.getById(id).subscribe((member) => {
            this.member = member;
        });
    }
}
