import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarContainerComponent } from './snackbar-container.component';

describe('SnackbarContainerComponent', () => {
  let component: SnackbarContainerComponent;
  let fixture: ComponentFixture<SnackbarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
