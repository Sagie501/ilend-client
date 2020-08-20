import { TestBed } from '@angular/core/testing';

import { AdminDiagramService } from './admin-diagram.service';

describe('AdminDiagramService', () => {
  let service: AdminDiagramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDiagramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
