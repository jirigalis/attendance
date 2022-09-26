import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SchoolyearMembersComponent } from '../schoolyear/schoolyear-members/schoolyear-members.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from './../material/material.module';
import { AddMemberComponent } from './add-member/add-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { MembersComponent } from './members/members.component';

@NgModule({
    declarations: [
        MembersComponent,
        SchoolyearMembersComponent,
        AddMemberComponent, EditMemberComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
    ],
    exports: [MembersComponent, AddMemberComponent],
})
export class MembersModule { }
