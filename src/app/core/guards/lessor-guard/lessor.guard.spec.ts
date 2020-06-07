import { TestBed } from '@angular/core/testing';

import { LessorGuard } from './lessor.guard';

describe('LessorGuard', () => {
  let guard: LessorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LessorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
