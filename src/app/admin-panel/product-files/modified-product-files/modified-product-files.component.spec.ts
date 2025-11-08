import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedProductFilesComponent } from './modified-product-files.component';

describe('ModifiedProductFilesComponent', () => {
  let component: ModifiedProductFilesComponent;
  let fixture: ComponentFixture<ModifiedProductFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifiedProductFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifiedProductFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
