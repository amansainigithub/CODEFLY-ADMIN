import { TestBed } from '@angular/core/testing';

import { EngineXAdminService } from './engine-xadmin.service';

describe('EngineXAdminService', () => {
  let service: EngineXAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineXAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
