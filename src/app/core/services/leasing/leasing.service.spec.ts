import { TestBed } from '@angular/core/testing';

import { LeasingService } from './leasing.service';

describe('LeasingService', () => {
  let service: LeasingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeasingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
