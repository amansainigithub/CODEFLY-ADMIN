import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRejectionReasonComponent } from './product-rejection-reason.component';

describe('ProductRejectionReasonComponent', () => {
  let component: ProductRejectionReasonComponent;
  let fixture: ComponentFixture<ProductRejectionReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductRejectionReasonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductRejectionReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
