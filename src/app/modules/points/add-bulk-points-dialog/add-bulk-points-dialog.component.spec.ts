import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkPointsDialogComponent } from './add-bulk-points-dialog.component';

describe('AddBulkPointsDialogComponent', () => {
  let component: AddBulkPointsDialogComponent;
  let fixture: ComponentFixture<AddBulkPointsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBulkPointsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBulkPointsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
