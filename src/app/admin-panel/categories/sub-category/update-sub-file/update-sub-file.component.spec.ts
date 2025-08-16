import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubFileComponent } from './update-sub-file.component';

describe('UpdateSubFileComponent', () => {
  let component: UpdateSubFileComponent;
  let fixture: ComponentFixture<UpdateSubFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateSubFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSubFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
