import { TestBed } from '@angular/core/testing';

import { DisApprovedStageService } from './dis-approved-stage.service';

describe('DisApprovedStageService', () => {
  let service: DisApprovedStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisApprovedStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
