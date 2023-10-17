import { TestBed } from '@angular/core/testing';

import { CompDataService } from './comp-data.service';

describe('CompDataService', () => {
  let service: CompDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
