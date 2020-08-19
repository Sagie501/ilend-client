import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLeasingsComponent } from './all-leasings.component';

describe('AllLeasingsComponent', () => {
  let component: AllLeasingsComponent;
  let fixture: ComponentFixture<AllLeasingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLeasingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLeasingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
