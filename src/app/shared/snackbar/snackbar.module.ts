import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarContainerComponent } from './components/snackbar-container/snackbar-container.component';



@NgModule({
  declarations: [SnackbarComponent, SnackbarContainerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatSnackBarModule,
  ],
  exports: [
    SnackbarContainerComponent
  ]
})
export class SnackbarModule { }
