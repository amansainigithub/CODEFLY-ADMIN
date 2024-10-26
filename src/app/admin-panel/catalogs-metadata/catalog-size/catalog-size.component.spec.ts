import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSizeComponent } from './catalog-size.component';

describe('CatalogSizeComponent', () => {
  let component: CatalogSizeComponent;
  let fixture: ComponentFixture<CatalogSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogSizeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
