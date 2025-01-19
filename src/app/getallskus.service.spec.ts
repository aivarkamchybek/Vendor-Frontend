import { TestBed } from '@angular/core/testing';

import { GetallskusService } from './getallskus.service';

describe('GetallskusService', () => {
  let service: GetallskusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetallskusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
