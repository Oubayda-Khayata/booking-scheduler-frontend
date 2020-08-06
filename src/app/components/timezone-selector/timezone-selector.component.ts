import { tap } from 'rxjs/operators';
import { Timezone } from './../../shared/models/timezone.model';
import { Observable } from 'rxjs';
import { TimezoneService } from './../../core/services/timezone/timezone.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-timezone-selector',
  templateUrl: './timezone-selector.component.html',
  styleUrls: ['./timezone-selector.component.scss']
})
export class TimezoneSelectorComponent implements OnInit {

timezoneFormGroup: FormGroup;
timezones: Observable<Timezone[]>;
  constructor(
    private formBuilder: FormBuilder,
    private timezoneService: TimezoneService,
    private dialogRef: MatDialogRef<TimezoneSelectorComponent>,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.timezones = this.timezoneService.getTimezones()
      .pipe(
        tap(() => {
          this.timezoneFormGroup.get('timezone').setValue(this.timezoneService.currentTimezone);
        })
      );
  }

  changeTimezone(): void {
    this.timezoneService.currentTimezone = this.timezoneFormGroup.get('timezone').value;
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  createForm(): void {
    this.timezoneFormGroup = this.formBuilder.group({
      timezone: [this.timezoneService.currentTimezone, Validators.required]
    });
  }

  getError(field: string): string {
    return this.timezoneFormGroup.get(field).hasError('required')
      ? 'This field is required'
      : '';
  }

}
