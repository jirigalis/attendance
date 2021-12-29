import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { FlexModule } from '@angular/flex-layout';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MomentModule,
    FlexModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts')})
  ]
})
export class DashboardModule { }
