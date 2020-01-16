import { FlexLayoutModule } from '@angular/flex-layout';
import { AddMemberComponent } from './add-member/add-member.component';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members/members.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [MembersComponent, AddMemberComponent],
    imports: [CommonModule, FlexLayoutModule, MaterialModule, ReactiveFormsModule],
    exports: [MembersComponent, AddMemberComponent]
})
export class MembersModule {}
