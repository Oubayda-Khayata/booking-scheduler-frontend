import { SnackbarModule } from './snackbar/snackbar.module';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,

    FlexLayoutModule,

    ColorPickerModule,

    BrowserAnimationsModule,

    MatVideoModule,

    SnackbarModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,

    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,

    FlexLayoutModule,

    ColorPickerModule,

    BrowserAnimationsModule,

    MatVideoModule,

    SnackbarModule,
  ]
})
export class SharedModule { }
