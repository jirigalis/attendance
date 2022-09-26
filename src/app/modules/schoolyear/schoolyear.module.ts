import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AddMemberToSchoolyearComponent } from './dialog/add-member-to-schoolyear/add-member-to-schoolyear.component';
import { SchoolyearDialogComponent } from './dialog/schoolyear-dialog/schoolyear-dialog.component';
import { SchoolyearComponent } from './schoolyear/schoolyear.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        SchoolyearComponent, 
        SchoolyearDialogComponent,
        AddMemberToSchoolyearComponent,
    ],
    exports: [SchoolyearComponent],
})
export class SchoolyearModule { }
