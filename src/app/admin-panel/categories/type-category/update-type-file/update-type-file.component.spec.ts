import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeFileComponent } from './update-type-file.component';

describe('UpdateTypeFileComponent', () => {
  let component: UpdateTypeFileComponent;
  let fixture: ComponentFixture<UpdateTypeFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTypeFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTypeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
