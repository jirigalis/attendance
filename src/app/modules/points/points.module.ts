import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AddBadgeDialogComponent } from './add-badge-dialog/add-badge-dialog.component';
import { AddBulkPointsDialogComponent } from './add-bulk-points-dialog/add-bulk-points-dialog.component';
import { AddPointsDialogComponent } from './add-points-dialog/add-points-dialog.component';
import { AddReasonComponent } from './add-reason/add-reason.component';
import { BadgeDialogComponent } from './badge-dialog/badge-dialog.component';
import { BadgesComponent } from './badges/badges.component';
import { BodovaniComponent } from './bodovani/bodovani.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { PointsDashboardComponent } from './points-dashboard/points-dashboard.component';
import { ReasonComponent } from './reason/reason.component';

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
