import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ContentType } from './content-type';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = 'https://api.oubayda.npplusplus.com/api';
  private API_KEY = 'This is an API Key';

  constructor() {}

  public getBaseUrl(): string {
    return this.BASE_URL;
  }

  public getAPIHeaders(
    contentType: ContentType,
    timezone?: string
  ): HttpHeaders {
    switch (contentType) {
      case ContentType.FormData:
        if (timezone) {
          return new HttpHeaders({
            Accept: 'application/json',
            'api-key': this.API_KEY,
            timezone,
          });
        }
        return new HttpHeaders({
          Accept: 'application/json',
          'api-key': this.API_KEY,
        });
      default:
        if (timezone) {
          return new HttpHeaders({
            'Content-Type': contentType,
            Accept: 'application/json',
            'api-key': this.API_KEY,
            timezone,
          });
        }
        return new HttpHeaders({
          'Content-Type': contentType,
          Accept: 'application/json',
          'api-key': this.API_KEY,
        });
    }
  }
}
