import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseProductDisplayComponent } from './lease-product-display.component';

describe('LeaseProductDisplayComponent', () => {
  let component: LeaseProductDisplayComponent;
  let fixture: ComponentFixture<LeaseProductDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseProductDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseProductDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
