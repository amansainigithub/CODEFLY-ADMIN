import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInvestigationComponent } from './product-investigation.component';

describe('ProductInvestigationComponent', () => {
  let component: ProductInvestigationComponent;
  let fixture: ComponentFixture<ProductInvestigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductInvestigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
