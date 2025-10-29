import { TestBed } from '@angular/core/testing';

import { EmailBucketService } from './email-bucket.service';

describe('EmailBucketService', () => {
  let service: EmailBucketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailBucketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
