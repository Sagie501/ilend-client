import { TestBed } from '@angular/core/testing';

import { DropdownFilterOverlayService } from './dropdown-filter-overlay.service';

describe('DropdownFilterOverlayService', () => {
  let service: DropdownFilterOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropdownFilterOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
