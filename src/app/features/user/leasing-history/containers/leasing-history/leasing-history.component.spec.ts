import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingHistoryComponent } from './leasing-history.component';

describe('LeasingHistoryComponent', () => {
  let component: LeasingHistoryComponent;
  let fixture: ComponentFixture<LeasingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
