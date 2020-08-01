import { ContentType } from './../api/content-type';
import { ApiService } from './../api/api.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimezoneService {
  constructor(
    private apiService: ApiService,
    private httpService: HttpClient
  ) {}

  getUserTimezone(): Observable<string> {
    const url = 'http://ip-api.com/json?fields=offset';
    return this.httpService.get<string>(url).pipe(
      map((data: any) => {
        const offset = +data.offset / 3600;
        if (offset > 0) {
          return `GMT+${offset}`;
        } else if (offset < 0) {
          return `GMT-${offset}`;
        } else {
          return 'GMT';
        }
      })
    );
  }

  getUserTimezoneHTTPS(): Observable<string> {
    const url = `${this.apiService.getBaseUrl()}/get-timezone`;
    return this.httpService
      .get<string>(url, {
        headers: this.apiService.getAPIHeaders(ContentType.JSON),
      })
      .pipe(
        map((data: any) => {
          const offset = +data.data.timezone / 3600;
          if (offset > 0) {
            return `GMT+${offset}`;
          } else if (offset < 0) {
            return `GMT-${offset}`;
          } else {
            return 'GMT';
          }
        })
      );
  }
}
