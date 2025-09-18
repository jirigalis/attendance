import { Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { AddMemberComponent } from './members/add-member/add-member.component';
import { EditMemberComponent } from './members/edit-member/edit-member.component';
import { MembersComponent } from './members/members/members.component';

import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import { MeetingDatesComponent } from './attendance/meeting-dates/meeting-dates.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { EventsComponent } from './event/events/events.component';
import { ExportAttendanceComponent } from './export-attendance/export-attendance.component';
import { BadgesComponent } from './points/badges/badges.component';
import { BodovaniComponent } from './points/bodovani/bodovani.component';
import { MemberDetailComponent } from './points/member-detail/member-detail.component';
import { PointsDashboardComponent } from './points/points-dashboard/points-dashboard.component';
import { ReasonComponent } from './points/reason/reason.component';
import { SchoolyearMembersComponent } from './schoolyear/schoolyear-members/schoolyear-members.component';
import { SchoolyearComponent } from './schoolyear/schoolyear/schoolyear.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { CiphersComponent } from './tools/ciphers/ciphers.component';
import { GamesComponent } from './tools/games/games.component';
import { ImagesComponent } from './tools/images/images.component';
import { LearningComponent } from './tools/learning/learning.component';
import { RemoteScreenComponent } from "./tools/remote-screen/remote-screen.component";

export const routes: Routes = [
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
                path: 'export-attendance',
                component: ExportAttendanceComponent,
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
            {
                path: 'schoolyear',
                component: SchoolyearComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'schoolyear-members',
                component: SchoolyearMembersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'settings',
                component: SettingsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'games',
                component: GamesComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'events',
                component: EventsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'events/:eventId',
                component: EventDetailComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'ciphers',
                component: CiphersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'images',
                component: ImagesComponent,
                // canActivate: [AuthGuard],
            },
            {
                path: 'learning',
                component: LearningComponent,
            },
            {
                path: 'remote-screen',
                component: RemoteScreenComponent,
            },
        ],
    },
];