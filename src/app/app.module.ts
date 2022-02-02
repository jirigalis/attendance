import { AttendanceModule } from './modules/attendance/attendance.module';
import { MembersModule } from './modules/members/members.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LoginModule } from './modules/login/login.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { httpInterceptorProviders } from './modules/core/interceptors/index';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './modules/core/core.module';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared/shared.module';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MomentModule } from 'ngx-moment';
import { PointsDashboardComponent } from './modules/points/points-dashboard/points-dashboard.component';
import { ReasonComponent } from './modules/points/reason/reason.component';
import { BadgesComponent } from './modules/points/badges/badges.component';
import { AddReasonComponent } from './modules/points/add-reason/add-reason.component';
import { BadgeDialogComponent } from './modules/points/badge-dialog/badge-dialog.component';
import { AddPointsDialogComponent } from './modules/points/add-points-dialog/add-points-dialog.component';
import { BodovaniComponent } from './modules/points/bodovani/bodovani.component';
import { MemberDetailComponent } from './modules/points/member-detail/member-detail.component';
import { AddBadgeDialogComponent } from './modules/points/add-badge-dialog/add-badge-dialog.component';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from './modules/core/custom-date-formats';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@NgModule({
    declarations: [
        AppComponent,
        PointsDashboardComponent,
        ReasonComponent,
        BadgesComponent,
        AddReasonComponent,
        BadgeDialogComponent,
        AddPointsDialogComponent,
        BodovaniComponent,
        MemberDetailComponent,
        AddBadgeDialogComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        DashboardModule,
        FlexLayoutModule,
        HttpClientModule,
        LoginModule,
        MaterialModule,
        MembersModule,
        AttendanceModule,
        MomentModule.forRoot({
            relativeTimeThresholdOptions: {
                m: 59,
            },
        }),
        SharedModule,
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
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
