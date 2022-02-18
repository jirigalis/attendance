import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PointsDashboardComponent } from './points-dashboard/points-dashboard.component';
import { ReasonComponent } from './reason/reason.component';
import { BadgesComponent } from './badges/badges.component';
import { AddReasonComponent } from './add-reason/add-reason.component';
import { BadgeDialogComponent } from './badge-dialog/badge-dialog.component';
import { AddPointsDialogComponent } from './add-points-dialog/add-points-dialog.component';
import { BodovaniComponent } from './bodovani/bodovani.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { AddBadgeDialogComponent } from './add-badge-dialog/add-badge-dialog.component';
import { RouterModule } from '@angular/router';
import { AddBulkPointsDialogComponent } from './add-bulk-points-dialog/add-bulk-points-dialog.component';

@NgModule({
    declarations: [
        AddBadgeDialogComponent,
        AddPointsDialogComponent,
        AddReasonComponent,
        MemberDetailComponent,
        BadgesComponent,
        BadgeDialogComponent,
        BodovaniComponent,
        PointsDashboardComponent,
        ReasonComponent,
        AddBulkPointsDialogComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        FormsModule,
        SharedModule,
    ],
    exports: [PointsDashboardComponent],
})
export class PointsModule {}
