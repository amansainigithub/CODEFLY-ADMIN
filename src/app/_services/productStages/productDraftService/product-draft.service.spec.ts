import { TestBed } from '@angular/core/testing';

import { ProductDraftService } from './product-draft.service';

describe('ProductDraftService', () => {
  let service: ProductDraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDraftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
