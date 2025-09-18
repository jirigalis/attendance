import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from "@ngbracket/ngx-layout";

@NgModule({
    declarations: [
    ],
    imports: [
        FlexLayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        FormsModule,
        SharedModule,
    ],
    exports: [],
})
export class PointsModule {}
