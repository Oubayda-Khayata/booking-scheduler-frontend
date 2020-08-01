import { DateUtility } from './../../../core/utilities/date-utility';
import { Expert } from './../../models/expert';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';
import { SnackbarService } from '../../snackbar/services/snackbar/snackbar.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler/error-handler.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ContentType } from 'src/app/core/services/api/content-type';
import { map, catchError } from 'rxjs/operators';
import { SnackbarType } from '../../snackbar/snackbar-type';

@Injectable({
  providedIn: 'root',
})
export class ExpertService {
  constructor(
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private errorHandlerService: ErrorHandlerService,
    private httpService: HttpClient
  ) {}

  get(): Observable<Expert[]> {
    const url = `${this.apiService.getBaseUrl()}/experts`;
    return this.httpService
      .get<Expert[]>(url, {
        headers: this.apiService.getAPIHeaders(ContentType.JSON),
      })
      .pipe(
        map((data: any) =>
          data.data.experts.map((expert: any) => {
            return new Expert().deserialize(expert);
          })
        ),
        catchError((error: any) => {
          switch (error.status) {
            case 401:
              return this.errorHandlerService.handleError(
                'services.expert.get',
                [],
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

  getExpert(id: number): Observable<Expert> {
    const url = `${this.apiService.getBaseUrl()}/experts/${id}`;
    return this.httpService
      .get<Expert>(url, {
        headers: this.apiService.getAPIHeaders(ContentType.JSON),
      })
      .pipe(
        map((data: any) => new Expert().deserialize(data.data.expert)),
        catchError((error: any) => {
          switch (error.status) {
            case 401:
              return this.errorHandlerService.handleError(
                'services.expert.getExpert',
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
                'services.expert.getExpert',
                null,
                (snackbarService: SnackbarService) => {
                  snackbarService.openSnackbar(
                    'Expert id not found',
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

  getExpertAppointments(
    expertId: number,
    fromDate: Date,
    toDate: Date,
    timezone?: string
  ): Observable<Date[]> {
    const url = `${this.apiService.getBaseUrl()}/get-expert-appointments/${expertId}?from_date=${DateUtility.toUNIXEpochDate(fromDate)}&to_date=${DateUtility.toUNIXEpochDate(toDate)}`;
    return this.httpService
      .get<Date[]>(url, {
        headers: this.apiService.getAPIHeaders(ContentType.JSON, timezone),
      })
      .pipe(
        map((data: any) =>
          data.data.appointments.map((appointment: any) => {
            return DateUtility.fromUNIXEpochDate(appointment.datetime);
          })
        ),
        catchError((error: any) => {
          switch (error.status) {
            case 400:
              return this.errorHandlerService.handleError(
                'services.expert.getExpertAppointments',
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
                'services.expert.getExpertAppointments',
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
                'services.expert.getExpertAppointments',
                null,
                (snackbarService: SnackbarService) => {
                  snackbarService.openSnackbar(
                    'Expert id not found',
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
