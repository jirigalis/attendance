import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAttendanceComponent } from '../add-attendance/add-attendance.component';
import { ExportAttendanceComponent } from '../export-attendance/export-attendance.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from './../material/material.module';
import { AttendanceComponent } from './attendance.component';
import { MeetingDatesComponent } from './meeting-dates/meeting-dates.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ],
    declarations: [
        AttendanceComponent,
        AddAttendanceComponent,
        MeetingDatesComponent,
        ExportAttendanceComponent,
    ],
})
export class AttendanceModule {}
