import { TestBed } from '@angular/core/testing';

import { RClientService } from './r-client.service';

describe('RClientService', () => {
  let service: RClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
