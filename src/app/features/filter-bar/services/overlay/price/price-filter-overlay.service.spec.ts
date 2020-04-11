import { TestBed } from '@angular/core/testing';

import { PriceFilterOverlayService } from './price-filter-overlay.service';

describe('PriceFilterOverlayService', () => {
  let service: PriceFilterOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceFilterOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
