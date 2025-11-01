import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailAuditComponent } from './send-email-audit.component';

describe('SendEmailAuditComponent', () => {
  let component: SendEmailAuditComponent;
  let fixture: ComponentFixture<SendEmailAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendEmailAuditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendEmailAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
