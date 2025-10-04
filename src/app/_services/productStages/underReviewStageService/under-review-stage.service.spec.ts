import { TestBed } from '@angular/core/testing';

import { UnderReviewStageService } from './under-review-stage.service';

describe('UnderReviewStageService', () => {
  let service: UnderReviewStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnderReviewStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
