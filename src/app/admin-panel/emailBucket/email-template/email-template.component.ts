import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrl: './email-template.component.css'
})
export class EmailTemplateComponent {
  templateName: string = '';
  htmlContent: string = '';
  safeHtml: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngDoCheck() {
    // Every change in htmlContent will update preview safely
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.htmlContent);
  }
}
