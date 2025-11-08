import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBlockedComponent } from './product-blocked.component';

describe('ProductBlockedComponent', () => {
  let component: ProductBlockedComponent;
  let fixture: ComponentFixture<ProductBlockedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductBlockedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductBlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
