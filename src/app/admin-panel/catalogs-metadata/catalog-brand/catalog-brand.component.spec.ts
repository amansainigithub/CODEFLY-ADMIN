import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogBrandComponent } from './catalog-brand.component';

describe('CatalogBrandComponent', () => {
  let component: CatalogBrandComponent;
  let fixture: ComponentFixture<CatalogBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogBrandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
