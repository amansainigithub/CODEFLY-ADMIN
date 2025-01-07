import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductUnderReviewVariantsComponent } from './seller-product-under-review-variants.component';

describe('SellerProductUnderReviewVariantsComponent', () => {
  let component: SellerProductUnderReviewVariantsComponent;
  let fixture: ComponentFixture<SellerProductUnderReviewVariantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerProductUnderReviewVariantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerProductUnderReviewVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
