import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { AddAttendanceComponent } from '../add-attendance/add-attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MeetingDatesComponent } from './meeting-dates/meeting-dates.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    declarations: [
        AttendanceComponent,
        AddAttendanceComponent,
        MeetingDatesComponent,
    ],
})
export class AttendanceModule {}
