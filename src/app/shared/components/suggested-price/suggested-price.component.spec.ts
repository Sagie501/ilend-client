import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedPriceComponent } from './suggested-price.component';

describe('SuggestedPriceComponent', () => {
  let component: SuggestedPriceComponent;
  let fixture: ComponentFixture<SuggestedPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
