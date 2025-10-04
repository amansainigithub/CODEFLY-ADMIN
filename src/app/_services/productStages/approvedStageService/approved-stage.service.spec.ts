import { TestBed } from '@angular/core/testing';

import { ApprovedStageService } from './approved-stage.service';

describe('ApprovedStageService', () => {
  let service: ApprovedStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovedStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
