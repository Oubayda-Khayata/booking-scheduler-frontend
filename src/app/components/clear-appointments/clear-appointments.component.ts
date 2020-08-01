import { AppointmentService } from './../../shared/services/appointment/appointment.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clear-appointments',
  templateUrl: './clear-appointments.component.html',
  styleUrls: ['./clear-appointments.component.scss'],
})
export class ClearAppointmentsComponent implements OnInit {
  constructor(
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.appointmentService.clearAllAppointments().subscribe(() => {
      this.router.navigateByUrl('/experts');
    });
  }
}
