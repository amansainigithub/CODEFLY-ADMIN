import { TestBed } from '@angular/core/testing';

import { RootRejectionCategoryService } from './root-rejection-category.service';

describe('RootRejectionCategoryService', () => {
  let service: RootRejectionCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RootRejectionCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
