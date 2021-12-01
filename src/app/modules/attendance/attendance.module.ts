import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { AddAttendanceComponent } from "../add-attendance/add-attendance.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, MaterialModule],
    declarations: [AttendanceComponent, AddAttendanceComponent]
})
export class AttendanceModule {}
