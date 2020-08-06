import { AppointmentDuration } from './../../models/appointment-duration.model';
import { map, catchError, tap } from 'rxjs/operators';
import { DateUtility } from './../../../core/utilities/date-utility';
import { TimeSlot } from './../../models/time-slot.model';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';
import { SnackbarService } from '../../snackbar/services/snackbar/snackbar.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler/error-handler.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContentType } from 'src/app/core/services/api/content-type';
import { SnackbarType } from '../../snackbar/snackbar-type';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private errorHandlerService: ErrorHandlerService,
    private httpService: HttpClient
  ) {}

  getTimeSlots(
    expertId: number,
    appointmentDurationId: number,
    date: Date,
    timezone?: string
  ): Observable<TimeSlot[]> {
    const url = `${this.apiService.getBaseUrl()}/get-time-slots?expert_id=${expertId}&appointment_duration_id=${appointmentDurationId}&date=${DateUtility.toUNIXEpochDate(
      date
    )}`;

    return this.httpService
      .get<TimeSlot[]>(url, {
        headers: this.apiService.getAPIHeaders(ContentType.JSON, timezone),
      })
      .pipe(
        map((data: any) =>
          data.data.time_slots.map((timeSlot: any) => {
            return new TimeSlot().deserialize(timeSlot);
          })
        ),
        catchError((error: any) => {
          switch (error.status) {
            case 400:
              return this.errorHandlerService.handleError(
                'services.appointment.getTimeSlots',
                null,
                (snackbarService: SnackbarService) => {
                  snackbarService.openSnackbar(
                    'Invalid data',
                    'Ok',
                    SnackbarType.Error
                  );
                },
                this.snackbarService
              )(error);
            case 401:
              return this.errorHandlerService.handleError(
                'services.appointment.getTimeSlots',
                null,
                (snackbarService: SnackbarService) => {
                  snackbarService.openSnackbar(
                    'Not Authorized',
                    'Ok',
                    SnackbarType.Error
                  );
                },
                this.snackbarService
              )(error);
            case 404:
              return this.errorHandlerService.handleError(
                'services.appointment.getTimeSlots',
                null,
                (snackbarService: SnackbarService) => {
                  snackbarService.openSnackbar(
                    'Expert id not found or appointment duration id not found',
                    'Ok',
                    SnackbarType.Error
                  );
                },
                this.snackbarService
              )(error);
          }
        })
      );
  }

  bookAppointment(
    username: string,
    expertId: number,
    appointmentDurationId: number,
    dateTime: number,
    timezone?: string
  ): Observable<boolean> {
    const url = `${this.apiService.getBaseUrl()}/book-appointment`;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('expert_id', expertId.toString());
    formData.append(
      'appointment_duration_id',
      appointmentDurationId.toString()
    );
    formData.append(
      'datetime',
      dateTime.toString()
    );
    return this.httpService
      .post<boolean>(url, formData, {
        headers: this.apiService.getAPIHeaders(ContentType.FormData, timezone),
      })
      .pipe(
        tap(() => {
          this.snackbarService.openSnackbar(
            'Appointment booked successfully',
            'Ok',
            SnackbarType.Success
          );
          return true;
        }),
        catchError((error: any) => {
          switch (error.status) {
            case 400:
              return this.errorHandlerService.handleError(
                'services.appointment.bookAppointment',
                null,
                (snackbarService: SnackbarService) => {
                  snackbarService.openSnackbar(
                    'Invalid data',
                    'Ok',
                    SnackbarType.Error
                  );
                },
                this.snackbarService
              )(error);
            case 401:
              return this.errorHandlerService.handleError(
                'services.appointment.bookAppointment',
                null,
                (snackbarService: SnackbarService) => {
                  snackbarService.openSnackbar(
                    'Not Authorized',
                    'Ok',
                    SnackbarType.Error
                  );
                },
                this.snackbarService
              )(error);
            case 404:
              return this.errorHandlerService.handleError(
                'services.appointment.bookAppointment',
                null,
                (snackbarService: SnackbarService) => {
                  snackbarService.openSnackbar(
                    'Expert id not found or appointment duration id not found',
                    'Ok',
                    SnackbarType.Error
                  );
                },
                this.snackbarService
              )(error);
          }
        })
      );
  }

  clearAllAppointments(): Observable<boolean> {
    const url = `${this.apiService.getBaseUrl()}/clear-appointments`;
    return this.httpService
      .post<boolean>(
        url,
        {},
        {
          headers: this.apiService.getAPIHeaders(ContentType.JSON),
        }
      )
      .pipe(
        tap(() => {
          this.snackbarService.openSnackbar(
            'All appointments have been cleared successfully',
            'Ok',
            SnackbarType.Success
          );
          return true;
        }),
        catchError((error: any) => {
          switch (error.status) {
            case 400:
              return this.errorHandlerService.handleError(
                'services.appointment.clearAllAppointments',
                null,
                (snackbarService: SnackbarService) => {
                  snackbarService.openSnackbar(
                    'Not Authorized',
                    'Ok',
                    SnackbarType.Error
                  );
                },
                this.snackbarService
              )(error);
          }
        })
      );
  }

  getAppointmentDurations(): Observable<AppointmentDuration[]> {
    const url = `${this.apiService.getBaseUrl()}/get-appointment-durations`;
    return this.httpService
      .get<AppointmentDuration[]>(url, {
        headers: this.apiService.getAPIHeaders(ContentType.FormData),
      })
      .pipe(
        map((data: any) =>
          data.data.appointment_durations.map((appointmentDuration: any) => {
            return new AppointmentDuration().deserialize(appointmentDuration);
          })
        ),
        catchError((error: any) => {
          switch (error.status) {
            case 401:
              return this.errorHandlerService.handleError(
                'services.appointment.getAppointmentDurations',
                null,
                (snackbarService: SnackbarService) => {
                  snackbarService.openSnackbar(
                    'Not Authorized',
                    'Ok',
                    SnackbarType.Error
                  );
                },
                this.snackbarService
              )(error);
          }
        })
      );
  }
}
