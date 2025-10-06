import { TestBed } from '@angular/core/testing';

import { ProductRejectReasonService } from './product-reject-reason.service';

describe('ProductRejectReasonService', () => {
  let service: ProductRejectReasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRejectReasonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
