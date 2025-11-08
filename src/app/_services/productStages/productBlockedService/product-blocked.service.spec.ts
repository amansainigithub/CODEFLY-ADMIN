import { TestBed } from '@angular/core/testing';

import { ProductBlockedService } from './product-blocked.service';

describe('ProductBlockedService', () => {
  let service: ProductBlockedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductBlockedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
