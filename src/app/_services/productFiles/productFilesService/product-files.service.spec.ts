import { TestBed } from '@angular/core/testing';

import { ProductFilesService } from './product-files.service';

describe('ProductFilesService', () => {
  let service: ProductFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
