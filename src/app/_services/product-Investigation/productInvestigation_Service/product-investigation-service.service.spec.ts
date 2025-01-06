import { TestBed } from '@angular/core/testing';

import { ProductInvestigationServiceService } from './product-investigation-service.service';

describe('ProductInvestigationServiceService', () => {
  let service: ProductInvestigationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductInvestigationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
