import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { BasicDialogComponent } from './dialog/basic-dialog/basic-dialog.component';
import { DividerWithTextComponent } from './divider-with-text/divider-with-text.component';
import { KpiCardComponent } from './kpi-card/kpi-card.component';
import { MaximizeDirective } from './maximize.directive';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { TransferListComponent } from './transfer-list/transfer-list.component';

@NgModule({
    declarations: [
        BasicDialogComponent,
        CustomDatePipe,
        DividerWithTextComponent,
        KpiCardComponent,
        TransferListComponent,
        MaximizeDirective
    ],
    imports: [CommonModule, FlexLayoutModule, MaterialModule],
    exports: [
        BasicDialogComponent,
        CustomDatePipe,
        DividerWithTextComponent,
        KpiCardComponent,
        MaximizeDirective,
        TransferListComponent,
    ],
})
export class SharedModule { }
