import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSliderFileComponent } from './update-slider-file.component';

describe('UpdateSliderFileComponent', () => {
  let component: UpdateSliderFileComponent;
  let fixture: ComponentFixture<UpdateSliderFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSliderFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSliderFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
