import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodovaniComponent } from './bodovani.component';

describe('BodovaniComponent', () => {
  let component: BodovaniComponent;
  let fixture: ComponentFixture<BodovaniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodovaniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodovaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
