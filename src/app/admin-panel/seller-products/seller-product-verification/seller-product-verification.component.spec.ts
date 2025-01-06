import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductVerificationComponent } from './seller-product-verification.component';

describe('SellerProductVerificationComponent', () => {
  let component: SellerProductVerificationComponent;
  let fixture: ComponentFixture<SellerProductVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerProductVerificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerProductVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
