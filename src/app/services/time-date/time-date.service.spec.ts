import { TestBed } from '@angular/core/testing';

import { TimeDateService } from './time-date.service';

describe('TimeDateService', () => {
  let service: TimeDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
