import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearAppointmentsComponent } from './clear-appointments.component';

describe('ClearAppointmentsComponent', () => {
  let component: ClearAppointmentsComponent;
  let fixture: ComponentFixture<ClearAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
