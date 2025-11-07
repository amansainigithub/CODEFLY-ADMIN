import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRootRejectionCategoryComponent } from './product-root-rejection-category.component';

describe('ProductRootRejectionCategoryComponent', () => {
  let component: ProductRootRejectionCategoryComponent;
  let fixture: ComponentFixture<ProductRootRejectionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductRootRejectionCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductRootRejectionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
