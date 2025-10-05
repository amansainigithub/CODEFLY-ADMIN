import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductApproverComponent } from './product-approver.component';

describe('ProductApproverComponent', () => {
  let component: ProductApproverComponent;
  let fixture: ComponentFixture<ProductApproverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductApproverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
