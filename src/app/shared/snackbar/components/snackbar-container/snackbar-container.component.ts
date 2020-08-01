import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarType } from './../../snackbar-type';
import { SnackbarService } from './../../services/snackbar/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-snackbar-container',
  templateUrl: './snackbar-container.component.html',
  styleUrls: ['./snackbar-container.component.scss'],
})
export class SnackbarContainerComponent implements OnInit {
  constructor(private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.snackbarService.snackbarState.subscribe(
      (state: {
        message: string;
        action: string;
        type: SnackbarType;
        snackbarService: MatSnackBar;
      }) => {
        state.snackbarService.openFromComponent(SnackbarComponent, {
          duration: 2000,
          data: {
            message: state.message,
            action: state.action,
            type: state.type,
          },
        });
      }
    );
  }
}
