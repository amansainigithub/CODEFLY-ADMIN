import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmailBucketService } from '../../../_services/emailBucket/emailBucketService/email-bucket.service';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrl: './email-template.component.css',
})
export class EmailTemplateComponent {

  template = {
    subject: '',
    templateKey: '',
    bodyHtml: '',
    module: '',
  };

  safeHtml: SafeHtml = '';

  emailTemplate:any= false;

  constructor(
    private sanitizer: DomSanitizer,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private emailBucketService:EmailBucketService
  ) {}

  ngDoCheck() {
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
      this.template.bodyHtml
    );
  }
  saveEmailTemplate() {
    console.log(this.template);

    //save File
    this.emailBucketService.saveEmailTemplate(this.template).subscribe({
      next: (res: any) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Data Saved Success',
          position: 'topRight',
          duration: 2000,
        });

        this.spinner.hide();
      },
      error: (err: any) => {
        this.toast.error({
          detail: 'Error',
          summary: err.error.data.message,
          position: 'topRight',
          duration: 2000,
        });
        this.spinner.hide();
        console.log(err);
      },
    });
  }

  showEmailTemplate() {
    if(!this.emailTemplate)
    {
      this.emailTemplate = true;
    }else{
      this.emailTemplate = false;
    }
  }
}
