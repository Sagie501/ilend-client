import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingsTableComponent } from './leasings-table.component';

describe('LeasingsTableComponent', () => {
  let component: LeasingsTableComponent;
  let fixture: ComponentFixture<LeasingsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasingsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
