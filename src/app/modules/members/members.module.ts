import { FlexLayoutModule } from '@angular/flex-layout';
import { AddMemberComponent } from './add-member/add-member.component';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members/members.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [MembersComponent, AddMemberComponent, EditMemberComponent],
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
export class MembersModule {}
