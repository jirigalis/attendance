import { AddMemberComponent } from './members/add-member/add-member.component';
import { EditMemberComponent } from './members/edit-member/edit-member.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { MembersComponent } from './members/members/members.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import { PointsDashboardComponent } from './points/points-dashboard/points-dashboard.component';
import { BadgesComponent } from './points/badges/badges.component';
import { ReasonComponent } from './points/reason/reason.component';
import { BodovaniComponent } from './points/bodovani/bodovani.component';
import { MemberDetailComponent } from './points/member-detail/member-detail.component';
import { MeetingDatesComponent } from './attendance/meeting-dates/meeting-dates.component';

const routes: Routes = [
    {
        path: '',
        // component: DashboardComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'members',
                component: MembersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'add-member',
                component: AddMemberComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'edit-member/:memberId',
                component: EditMemberComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'attendance',
                component: AttendanceComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'add-attendance',
                component: AddAttendanceComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'meeting-dates',
                component: MeetingDatesComponent,
                canActivate: [AuthGuard],
            },
            { path: 'login', component: LoginFormComponent },
            {
                path: 'points',
                component: PointsDashboardComponent,
                canActivate: [AuthGuard],
            },
            { path: 'bodovani', component: BodovaniComponent },
            {
                path: 'bodovani/:id',
                component: MemberDetailComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'badges',
                component: BadgesComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'reasons',
                component: ReasonComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
