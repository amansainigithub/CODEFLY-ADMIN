import { TestBed } from '@angular/core/testing';

import { RootCategoryService } from './root-category.service';

describe('RootCategoryService', () => {
  let service: RootCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RootCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
