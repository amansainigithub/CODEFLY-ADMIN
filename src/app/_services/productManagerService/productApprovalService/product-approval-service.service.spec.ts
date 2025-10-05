import { TestBed } from '@angular/core/testing';

import { ProductApprovalServiceService } from './product-approval-service.service';

describe('ProductApprovalServiceService', () => {
  let service: ProductApprovalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductApprovalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
