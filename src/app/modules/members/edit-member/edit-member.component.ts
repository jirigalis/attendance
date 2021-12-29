import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../core/models';

@Component({
  selector: 'edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {

  memberForm: FormGroup;
  member: Member;

  constructor(
      private fb: FormBuilder,
      private snack: MatSnackBar,
      private memberService: MemberService,
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
          id: []
      });
  }

    ngOnInit() {
        const routerParams = this.route.snapshot.paramMap;
        const memberId = Number(routerParams.get('memberId'));
        this.memberService.getById(memberId).subscribe(res => {
            this.member = res;
            this.memberForm.patchValue(res)
        })
    }

    onSubmit() {
        if (this.memberForm.valid) {
            this.memberService.update(this.memberForm.value).subscribe(
                res => {
                    this.snack.open('Změny úspěšně uloženy.', 'X', {
                        duration: 3000
                    });
                },
                err => {
                    this.snack.open('Během ukládání změn nastala chyba.', 'X', {
                        duration: 3000
                    });
                }
            );
        }
    }

}
