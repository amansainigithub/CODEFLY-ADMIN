import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVarientApprovedComponent } from './product-varient-approved.component';

describe('ProductVarientApprovedComponent', () => {
  let component: ProductVarientApprovedComponent;
  let fixture: ComponentFixture<ProductVarientApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductVarientApprovedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductVarientApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
