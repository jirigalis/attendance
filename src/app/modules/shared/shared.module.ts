import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDialogComponent } from './dialog/basic-dialog/basic-dialog.component';
import { MaterialModule } from '../material/material.module';
import { CustomDatePipe } from './pipes/custom-date.pipe';

@NgModule({
    declarations: [BasicDialogComponent, CustomDatePipe],
    imports: [CommonModule, MaterialModule],
    exports: [BasicDialogComponent, CustomDatePipe],
    entryComponents: [BasicDialogComponent],
})
export class SharedModule {}
