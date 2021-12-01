import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddAttendanceComponent } from './add-attendance.component';

describe('AddAttendanceComponent', () => {
  let component: AddAttendanceComponent;
  let fixture: ComponentFixture<AddAttendanceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
