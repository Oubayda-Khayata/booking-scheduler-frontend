import { MaterialModule } from './shared/material/material.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpertsComponent } from './components/experts/experts.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { ExpertDetailsComponent } from './components/expert-details/expert-details.component';
import { ExpertCardComponent } from './components/expert-card/expert-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClearAppointmentsComponent } from './components/clear-appointments/clear-appointments.component';
import { TimezoneSelectorComponent } from './components/timezone-selector/timezone-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpertsComponent,
    AppointmentComponent,
    ExpertDetailsComponent,
    ExpertCardComponent,
    ClearAppointmentsComponent,
    TimezoneSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
