import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { BasicDialogComponent } from './dialog/basic-dialog/basic-dialog.component';
import { DividerWithTextComponent } from './divider-with-text/divider-with-text.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';

@NgModule({
    declarations: [
        BasicDialogComponent,
        CustomDatePipe,
        DividerWithTextComponent,
    ],
    imports: [CommonModule, FlexLayoutModule, MaterialModule],
    exports: [
        BasicDialogComponent,
        CustomDatePipe,
        DividerWithTextComponent,
    ],
    entryComponents: [BasicDialogComponent, DividerWithTextComponent],
})
export class SharedModule { }
