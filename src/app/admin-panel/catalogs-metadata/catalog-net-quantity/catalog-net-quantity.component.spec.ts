import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogNetQuantityComponent } from './catalog-net-quantity.component';

describe('CatalogNetQuantityComponent', () => {
  let component: CatalogNetQuantityComponent;
  let fixture: ComponentFixture<CatalogNetQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogNetQuantityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogNetQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
