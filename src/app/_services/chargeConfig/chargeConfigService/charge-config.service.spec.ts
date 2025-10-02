import { TestBed } from '@angular/core/testing';

import { ChargeConfigService } from './charge-config.service';

describe('ChargeConfigService', () => {
  let service: ChargeConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargeConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
