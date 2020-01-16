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
    MatNativeDateModule,
    MAT_DATE_LOCALE,
    MatTooltipModule,
    MatDialogModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatDialogModule,
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
        MatToolbarModule,
        MatTooltipModule
    ],
    providers: [
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'cs-CZ'
        }
    ]
})
export class MaterialModule {}
