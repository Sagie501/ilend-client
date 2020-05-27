import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingLeasingsComponent } from './ongoing-leasings.component';

describe('OngoingLeasingsComponent', () => {
  let component: OngoingLeasingsComponent;
  let fixture: ComponentFixture<OngoingLeasingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingLeasingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingLeasingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
