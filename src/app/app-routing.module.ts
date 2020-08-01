import { ClearAppointmentsComponent } from './components/clear-appointments/clear-appointments.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { ExpertDetailsComponent } from './components/expert-details/expert-details.component';
import { ExpertsComponent } from './components/experts/experts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'experts',
    component: ExpertsComponent
  },
  {
    path: 'experts/:id',
    component: ExpertDetailsComponent
  },
  {
    path: 'appointment/:id',
    component: AppointmentComponent
  },
  {
    path: 'clear-appointments',
    component: ClearAppointmentsComponent
  },
  {
    path: '**',
    redirectTo: 'experts'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
