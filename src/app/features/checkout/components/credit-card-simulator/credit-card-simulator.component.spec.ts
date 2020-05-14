import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardSimulatorComponent } from './credit-card-simulator.component';

describe('CreditCardSimulatorComponent', () => {
  let component: CreditCardSimulatorComponent;
  let fixture: ComponentFixture<CreditCardSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCardSimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
