import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchManagementComponent } from './product-search-management.component';

describe('ProductSearchManagementComponent', () => {
  let component: ProductSearchManagementComponent;
  let fixture: ComponentFixture<ProductSearchManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSearchManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSearchManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
