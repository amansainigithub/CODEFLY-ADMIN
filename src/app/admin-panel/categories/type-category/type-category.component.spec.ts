import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCategoryComponent } from './type-category.component';

describe('TypeCategoryComponent', () => {
  let component: TypeCategoryComponent;
  let fixture: ComponentFixture<TypeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
