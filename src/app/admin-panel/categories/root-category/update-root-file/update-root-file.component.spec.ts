import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRootFileComponent } from './update-root-file.component';

describe('UpdateRootFileComponent', () => {
  let component: UpdateRootFileComponent;
  let fixture: ComponentFixture<UpdateRootFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRootFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateRootFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
