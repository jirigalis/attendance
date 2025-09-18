import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './modules/app-routing.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { httpInterceptorProviders } from './modules/core/interceptors/index';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LoginModule } from './modules/login/login.module';
import { MembersModule } from './modules/members/members.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MomentModule } from 'ngx-moment';
import { CoreModule } from './modules/core/core.module';
import { CUSTOM_DATE_FORMATS } from './modules/core/custom-date-formats';
import { EventModule } from './modules/event/event.module';
import { MaterialModule } from './modules/material/material.module';
import { PointsModule } from './modules/points/points.module';
import { SchoolyearModule } from './modules/schoolyear/schoolyear.module';
import { SettingsModule } from './modules/settings/settings.module';
import { SharedModule } from './modules/shared/shared.module';
import { ToolsModule } from './modules/tools/tools.module';

@NgModule({
    imports: [
        AppRoutingModule,
        AttendanceModule,
        BrowserModule,
        CommonModule,
        CoreModule,
        DashboardModule,
        EventModule,
        FlexLayoutModule,
        FormsModule,
        LoginModule,
        MaterialModule,
        MembersModule,
        PointsModule,
        ReactiveFormsModule,
        MomentModule.forRoot({
            relativeTimeThresholdOptions: {
                m: 59,
            },
        }),
        SettingsModule,
        SharedModule,
        SchoolyearModule,
        ToolsModule,
        NgxEchartsModule.forRoot({ echarts }),
    ],
    providers: [
        httpInterceptorProviders,
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: CUSTOM_DATE_FORMATS,
        },
        { provide: MAT_DATE_LOCALE, useValue: 'cs-CZ' },
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true}}
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
