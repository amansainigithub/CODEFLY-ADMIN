import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDisApprovedComponent } from './product-dis-approved.component';

describe('ProductDisApprovedComponent', () => {
  let component: ProductDisApprovedComponent;
  let fixture: ComponentFixture<ProductDisApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDisApprovedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDisApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
