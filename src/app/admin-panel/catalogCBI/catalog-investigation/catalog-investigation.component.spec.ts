import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogInvestigationComponent } from './catalog-investigation.component';

describe('CatalogInvestigationComponent', () => {
  let component: CatalogInvestigationComponent;
  let fixture: ComponentFixture<CatalogInvestigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogInvestigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
