import { TestBed } from '@angular/core/testing';

import { ProductApprovalService } from './product-approval.service';

describe('ProductApprovalService', () => {
  let service: ProductApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
