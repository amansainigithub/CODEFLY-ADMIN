import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVariantFileComponent } from './update-variant-file.component';

describe('UpdateVariantFileComponent', () => {
  let component: UpdateVariantFileComponent;
  let fixture: ComponentFixture<UpdateVariantFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateVariantFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateVariantFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
