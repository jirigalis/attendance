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

const routes: Routes = [
    {
        path: '',
        // component: DashboardComponent,
        children: [
            { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
            { path: 'add-member', component: AddMemberComponent, canActivate: [AuthGuard] },
            { path: 'edit-member/:memberId', component: EditMemberComponent, canActivate: [AuthGuard] },
            { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
            { path: 'add-attendance', component: AddAttendanceComponent, canActivate: [AuthGuard] },
            { path: 'login', component: LoginFormComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
