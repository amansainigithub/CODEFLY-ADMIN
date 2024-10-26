import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogMaterialComponent } from './catalog-material.component';

describe('CatalogMaterialComponent', () => {
  let component: CatalogMaterialComponent;
  let fixture: ComponentFixture<CatalogMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
