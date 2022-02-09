import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDialogComponent } from './dialog/basic-dialog/basic-dialog.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [BasicDialogComponent],
    imports: [CommonModule, MaterialModule],
    exports: [BasicDialogComponent],
    entryComponents: [BasicDialogComponent],
})
export class SharedModule {}
