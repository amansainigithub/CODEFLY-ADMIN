import { TestBed } from '@angular/core/testing';

import { VariantCategoryService } from './variant-category.service';

describe('VariantCategoryService', () => {
  let service: VariantCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
