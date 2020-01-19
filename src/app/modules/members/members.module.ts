import { FlexLayoutModule } from '@angular/flex-layout';
import { AddMemberComponent } from './add-member/add-member.component';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members/members.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [MembersComponent, AddMemberComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [MembersComponent, AddMemberComponent]
})
export class MembersModule {}
