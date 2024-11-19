import { TestBed } from '@angular/core/testing';

import { CatalogInvestigationService } from './catalog-investigation.service';

describe('CatalogInvestigationService', () => {
  let service: CatalogInvestigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogInvestigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
