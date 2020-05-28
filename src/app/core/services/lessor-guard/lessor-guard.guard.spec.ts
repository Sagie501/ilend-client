import { TestBed } from '@angular/core/testing';

import { LessorGuardGuard } from './lessor-guard.guard';

describe('LessorGuardGuard', () => {
  let guard: LessorGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LessorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
