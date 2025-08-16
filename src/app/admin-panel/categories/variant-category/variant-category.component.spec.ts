import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantCategoryComponent } from './variant-category.component';

describe('VariantCategoryComponent', () => {
  let component: VariantCategoryComponent;
  let fixture: ComponentFixture<VariantCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VariantCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariantCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
