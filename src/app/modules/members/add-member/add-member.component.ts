import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MemberService } from '../../core/services';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-add-member',
    templateUrl: './add-member.component.html',
    imports: [
        FlexLayoutModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatCheckboxModule,
        MatButtonModule,
    ],
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
            email: [''],
            contact: [''],
            rc: ['', Validators.minLength(10)],
            role: ['D', Validators.required],
            application: [],
            paid: [],
            requirements: [],
            id: []
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
