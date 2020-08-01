import { SnackbarService } from './../../services/snackbar/snackbar.service';
import { Component, OnInit, Inject } from '@angular/core';
import { SnackbarType } from '../../snackbar-type';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  data: { message: string, action: string, type: SnackbarType };
  constructor(
    private snackbarService: SnackbarService,
    @Inject(MAT_SNACK_BAR_DATA) data: any) {
      this.data = data;
    }

  ngOnInit(): void {
  }

  action(): void {
    this.snackbarService.closeSnackbar();
  }

  get isError(): boolean {
    return this.data.type === SnackbarType.Error;
  }

}
