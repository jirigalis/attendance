import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../core/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-member',
    templateUrl: './add-member.component.html',
    styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
    memberForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private snack: MatSnackBar,
        private memberService: MemberService,
        private router: Router
    ) {
        this.memberForm = this.fb.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            address: [''],
            contact: [''],
            rc: ['']
        });
    }

    ngOnInit() {}

    onSubmit() {
        if (this.memberForm.valid) {
            this.memberService.create(this.memberForm.value).subscribe(
                res => {
                    this.snack.open('New member successfully created.', 'X', {
                        duration: 3000
                    });
                    this.router.navigate(['/members']);
                },
                err => {
                    this.snack.open('Error during creating new member', 'X', {
                        duration: 3000
                    });
                }
            );
        }
    }
}
