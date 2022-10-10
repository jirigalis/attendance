import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { NgxEchartsModule } from 'ngx-echarts';
import { MomentModule } from 'ngx-moment';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from './../material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MomentModule,
    FlexModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts')}),
    SharedModule,
  ]
})
export class DashboardModule { }
