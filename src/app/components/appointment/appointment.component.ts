import { ExpertService } from './../../shared/services/expert/expert.service';
import { TimezoneService } from './../../core/services/timezone/timezone.service';
import { TimeSlot } from './../../shared/models/time-slot';
import { AppointmentService } from './../../shared/services/appointment/appointment.service';
import { AppointmentDuration } from './../../shared/models/appointment-duration';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppointmentComponent implements OnInit {
  appointmentFormGroup: FormGroup;
  timezones: string[] = [];
  durations: Observable<AppointmentDuration[]>;
  timeslots: Observable<TimeSlot[]>;
  description: string;
  expertAppointments: Date[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private expertService: ExpertService,
    private timezoneService: TimezoneService
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.timezoneService.getUserTimezone().subscribe((timezone: string) => {
      this.appointmentFormGroup.get('timezone').setValue(timezone);
      this.timezoneChanged();
    });

    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.appointmentFormGroup.get('expertId').setValue(id);
    });

    for(let timezone = -12; timezone <= 12; timezone++) {
      if (timezone > 0) {
        this.timezones.push(`GMT+${timezone}`);
      } else if (timezone < 0) {
        this.timezones.push(`GMT-${-timezone}`);
      } else {
        this.timezones.push('GMT');
      }
    }

    this.durations = this.appointmentService.getAppointmentDurations();
  }

  bookNow(): void {
    const username = this.appointmentFormGroup.get('username').value;
    const expertId = this.appointmentFormGroup.get('expertId').value;
    const timezone = this.appointmentFormGroup.get('timezone').value;
    const durationId = this.appointmentFormGroup.get('durationId').value;
    const datetime = this.appointmentFormGroup.get('timeslot').value.dateTime;

    this.appointmentService.bookAppointment(
      username,
      expertId,
      durationId,
      datetime,
      timezone
    ).subscribe((success: boolean) => {
      if (success) {
        this.router.navigateByUrl('/experts');
      }
    })
  }

  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();

    const appointmentCount = this.expertAppointments.filter(appointment => appointment.getDate() === date).length;
    if (appointmentCount === 0) {
      return '';
    }

    switch (appointmentCount) {
      case 1:
        return 'green-date-class';
      case 2:
        return 'orange-date-class';
      default:
        return 'red-date-class';
    }
  }

  timezoneChanged(): void {
    const expertId = this.appointmentFormGroup.get('expertId').value;
    const timezone = this.appointmentFormGroup.get('timezone').value;
    let date = this.appointmentFormGroup.get('date').value;
    if(!date) {
      date = new Date();
    }
    let fromDate = new Date(date.getFullYear(), 0, 1);
    fromDate.setHours(0, 0, 0, 0);
    let toDate = new Date(date.getFullYear(), 11, 31);
    toDate.setHours(23, 59, 59, 999);

    this.expertService.getExpertAppointments(
      expertId,
      fromDate,
      toDate,
      timezone
    ).subscribe((appointments: Date[]) => this.expertAppointments = appointments);
    this.inputChanged();
  }

  createForm(): void {
    this.appointmentFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      expertId: [0, Validators.required],
      timezone: ['', Validators.required],
      date: ['', Validators.required],
      durationId: ['', Validators.required],
      timeslot: ['', Validators.required],
    });
  }

  getError(field: string): string {
    return this.appointmentFormGroup.get(field).hasError('required') ? 'This field is required' : '';
  }

  inputChanged(): void {
    this.description = '';
    const expertId = this.appointmentFormGroup.get('expertId').value;
    const timezone = this.appointmentFormGroup.get('timezone').value;
    const date = this.appointmentFormGroup.get('date').value;
    const durationId = this.appointmentFormGroup.get('durationId').value;

    if (expertId && date && durationId) {
      this.timeslots = this.appointmentService.getTimeSlots(expertId, durationId, date, timezone);
    }
  }

  timeslotChanged(): void {
    const date: Date = this.appointmentFormGroup.get('date').value;
    const timeslot: TimeSlot = this.appointmentFormGroup.get('timeslot').value;
    this.description = `Your appointment will be on ${date.toDateString()} from ${timeslot.fromTime} to ${timeslot.toTime}`;
  }
}
