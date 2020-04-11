import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceFilterOverlayComponent } from './price-filter-overlay.component';

describe('PriceFilterOverlayComponent', () => {
  let component: PriceFilterOverlayComponent;
  let fixture: ComponentFixture<PriceFilterOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceFilterOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceFilterOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
