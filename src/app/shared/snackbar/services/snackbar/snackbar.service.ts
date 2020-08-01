import { Injectable } from '@angular/core';
import { SnackbarType } from '../../snackbar-type';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbarSubject = new Subject<{
    message: string;
    action: string;
    type: SnackbarType;
    snackbarService: MatSnackBar;
  }>();
  public snackbarState = this.snackbarSubject.asObservable();
  constructor(private snackbarService: MatSnackBar) {}

  openSnackbar(message: string, action: string, type: SnackbarType) {
    this.snackbarSubject.next({
      message,
      action,
      type,
      snackbarService: this.snackbarService,
    });
  }

  closeSnackbar() {
    this.snackbarService.dismiss();
  }
}
