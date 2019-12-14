import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members/members.component';

@NgModule({
  declarations: [MembersComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MembersComponent
  ]
})
export class MembersModule { }
