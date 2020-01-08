import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import {
    MatSidenavModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatProgressBarModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule
    ]
})
export class MaterialModule {}
