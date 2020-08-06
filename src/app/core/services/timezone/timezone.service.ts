import { SnackbarType } from './../../../shared/snackbar/snackbar-type';
import { SnackbarService } from './../../../shared/snackbar/services/snackbar/snackbar.service';
import { ErrorHandlerService } from './../error-handler/error-handler.service';
import { Timezone } from './../../../shared/models/timezone.model';
import { ContentType } from './../api/content-type';
import { ApiService } from './../api/api.service';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimezoneService {
  constructor(
    private apiService: ApiService,
    private httpService: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private snackbarService: SnackbarService
  ) {}

  private timezones: Timezone[] = [];
  private currentTimezoneSubject = new Subject<string>();
  public currentTimezoneState = this.currentTimezoneSubject.asObservable();

  private _currentTimezone: string;
  public get currentTimezone(): string {
    if (!this._currentTimezone) {
      if (location.protocol === 'https:') {
        this.getUserTimezoneHTTPS().subscribe((timezone: string) => {
          this._currentTimezone = timezone;
        });
      } else {
        this.getUserTimezone().subscribe((timezone: string) => {
          this._currentTimezone = timezone;
        });
      }
    }
    return this._currentTimezone;
  }
  public set currentTimezone(_currentTimezone: string) {
    this._currentTimezone = _currentTimezone;
    this.currentTimezoneSubject.next(this._currentTimezone);
  }

  getUserTimezone(): Observable<string> {
    const url = 'http://ip-api.com/json?fields=timezone';
    return this.httpService.get<string>(url).pipe(
      map((data: any) => data.timezone),
      catchError(
        this.errorHandlerService.handleError(
          'services.timezone.getUserTimezone',
          '',
          (snackbarService: SnackbarService) => {
            snackbarService.openSnackbar(
              'Error while load user timezone',
              'Ok',
              SnackbarType.Error
            );
          },
          this.snackbarService
        )
      )
    );
  }

  getUserTimezoneHTTPS(): Observable<string> {
    const url = `${this.apiService.getBaseUrl()}/get-timezone`;
    return this.httpService
      .get<string>(url, {
        headers: this.apiService.getAPIHeaders(ContentType.JSON),
      })
      .pipe(
        map((data: any) => data.data.timezone),
        catchError(
          this.errorHandlerService.handleError(
            'services.timezone.getUserTimezoneHTTPS',
            '',
            (snackbarService: SnackbarService) => {
              snackbarService.openSnackbar(
                'Error while load user timezone with HTTPS',
                'Ok',
                SnackbarType.Error
              );
            },
            this.snackbarService
          )
        )
      );
  }

  getTimezones(): Observable<Timezone[]> {
    if (this.timezones.length > 0) {
      return of(this.timezones);
    }
    const url = `${this.apiService.getBaseUrl()}/timezones`;
    return this.httpService
      .get<Timezone[]>(url, {
        headers: this.apiService.getAPIHeaders(ContentType.JSON),
      })
      .pipe(
        map((data: any) =>
          data.data.timezones.map((timezone: any) => {
            return new Timezone().deserialize(timezone);
          })
        ),
        map((timezones: Timezone[]) =>
          timezones.sort((a, b) => {
            if (a.utcOffset === b.utcOffset) {
              return a.name > b.name ? 1 : -1;
            }
            return a.utcOffset - b.utcOffset;
          })
        ),
        tap((timezones: Timezone[]) => (this.timezones = timezones)),
        catchError(
          this.errorHandlerService.handleError(
            'services.timezone.getTimezones',
            [],
            (snackbarService: SnackbarService) => {
              snackbarService.openSnackbar(
                'Error while load timezones',
                'Ok',
                SnackbarType.Error
              );
            },
            this.snackbarService
          )
        )
      );
  }
}
