import { TestBed } from '@angular/core/testing';

import { MainSliderService } from './main-slider.service';

describe('MainSliderService', () => {
  let service: MainSliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainSliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
