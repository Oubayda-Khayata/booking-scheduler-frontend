import { TimezoneSelectorComponent } from './components/timezone-selector/timezone-selector.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'booking-scheduler-frontend';
  constructor(
    public ngxLoadingBar: LoadingBarService,
    public mediaObserver: MediaObserver,
    private router: Router,
    private dialog: MatDialog
  ) {}

  changeTimezone(): void {
    const dialogRef = this.dialog.open(TimezoneSelectorComponent, {
      width: '400px'
    });
  }
}
