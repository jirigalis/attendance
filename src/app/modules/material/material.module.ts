import { MatSliderModule } from '@angular/material/slider';
import {
  MatSidenavModule,
  MatMenuModule,
  MatCardModule,
  MatInputModule,
  MatTableModule,
  MatProgressBarModule,
  MatSortModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
  ],
})
export class MaterialModule { }
