import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  public handleError<T>(operation = 'operation', result?: T, callback?: (param: any) => void, param?: any): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed!`);
      if (typeof callback === typeof ((_: any): void => { })) {
        if (param != null) {
          callback(param);
        } else {
          callback(error);
        }
      }
      return of(result as T);
    };
  }

}
