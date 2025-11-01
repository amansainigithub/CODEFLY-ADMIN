import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmailBucketService } from '../../../_services/emailBucket/emailBucketService/email-bucket.service';
import { PageEvent } from '@angular/material/paginator';

declare var bootstrap: any; // Declare bootstrap for accessing modal methods

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrl: './email-template.component.css',
})
export class EmailTemplateComponent {

  //Toggle Create Email Template Form
  emailTemplate: any = false;

  //Template Object
  template = {
    subject: '',
    templateKey: '',
    bodyHtml: '',
    module: '',
  };
  //safeHtml for Create Form
  safeHtmlCreate: SafeHtml = '';

  //Filter List For Searching
  filteredItems: any = [];

  //Product List
  emailTemplateList: any[] = [];
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  //SearchList
  searchText: string = '';

  //Update Template Object
  updateTemplate = {
    id: '',
    subject: '',
    templateKey: '',
    bodyHtml: '',
    module: '',
  };

  //safeHtml for Update Modal
  safeHtmlUpdate: SafeHtml = '';
  
  //email Template Data Holder 
  updateEmailTemplateData: any;

  constructor(
    private sanitizer: DomSanitizer,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private emailBucketService: EmailBucketService
  ) {}

  ngOnInit(): void {
    this.getEmailTemplates({ page: '0', size: '10' });
  }

  ngDoCheck() {
    // Update live preview for CREATE form
    this.safeHtmlCreate = this.sanitizer.bypassSecurityTrustHtml(
      this.template.bodyHtml
    );

    // Update live preview for UPDATE modal
    this.safeHtmlUpdate = this.sanitizer.bypassSecurityTrustHtml(
      this.updateTemplate.bodyHtml
    );
  }

  getEmailTemplates(request: any) {
    this.spinner.show();
    this.emailBucketService.getEmailTemplates(request).subscribe({
      next: (res: any) => {
        this.emailTemplateList = res.data['content'];
        this.filteredItems = this.emailTemplateList;
        this.totalElements = res.data['totalElements'];
        this.toast.success({
          detail: 'Success',
          summary: 'Data Fetch Success',
          position: 'topRight',
          duration: 2000,
        });
        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err);
        this.spinner.hide();
        this.toast.error({
          detail: 'Error',
          summary: err,
          position: 'bottomRight',
          duration: 2000,
        });
      },
    });
  }

  nextPage(event: PageEvent) {
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getEmailTemplates(request);
  }

  //SAVE EMAIL TEMPLATE START
  saveEmailTemplate() {
    this.emailBucketService.saveEmailTemplate(this.template).subscribe({
      next: (res: any) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Data Saved Success',
          position: 'topRight',
          duration: 2000,
        });

        //Save Email Template After Fetching List
        this.getEmailTemplates({ page: '0', size: '10' });

        this.emailTemplate = false;
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
  //SAVE EMAIL TEMPLATE END

  //TOGGLE EMAIL TEMPLATE FORM
  showEmailTemplate() {
    if (!this.emailTemplate) {
      this.emailTemplate = true;
    } else {
      this.emailTemplate = false;
    }
    this.getEmailTemplates({ page: '0', size: '10' });
  }

  //REMOVE EMAIL TEMPLATE START
  removeTemplate(templateId: any) {
    this.emailBucketService.removeEmailTemplate(templateId).subscribe({
      next: (res: any) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Template Removed',
          position: 'topRight',
          duration: 2000,
        });
        this.spinner.hide();

        //Save Email Template After Fetching List
        this.getEmailTemplates({ page: '0', size: '10' });
      },
      error: (err: any) => {
        this.toast.error({
          detail: 'Error',
          summary: 'Template Not Removed',
          position: 'topRight',
          duration: 2000,
        });
        this.spinner.hide();
        console.log(err);
      },
    });
  }
 

  //**********************************************************8 */
  //UPDATE EMAIL TEMPLATE START


  modifyEmailTemplate(emailTemplate: any) {
    this.modelOpen();

    this.updateEmailTemplateData = emailTemplate;
    this.updateTemplate.id = this.updateEmailTemplateData.id;
    this.updateTemplate.templateKey = this.updateEmailTemplateData.templateKey;
    this.updateTemplate.subject = this.updateEmailTemplateData.subject;
    this.updateTemplate.bodyHtml = this.updateEmailTemplateData.bodyHtml;
    this.updateTemplate.module = this.updateEmailTemplateData.module;

    //Safe HTML to show HTML-PREVIEW
    this.safeHtmlUpdate = this.sanitizer.bypassSecurityTrustHtml(
      this.updateTemplate.bodyHtml
    );
  }

  updateEmailTemplate() {
    this.emailBucketService.updateEmailTemplate(this.updateTemplate).subscribe({
      next: (res: any) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Data Update Success',
          position: 'topRight',
          duration: 2000,
        });

        //Save Email Template After Fetching List
        this.getEmailTemplates({ page: '0', size: '10' });

        this.emailTemplate = false;
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toast.error({
          detail: 'Error',
          summary: 'Data Not Updated',
          position: 'topRight',
          duration: 2000,
        });
        this.spinner.hide();
        console.log(err);
      },
    });
  }
  //**********************************************************8 */
  //UPDATE EMAIL TEMPLATE END










  //REFRESH PAGE
   refershPage() {
    this.getEmailTemplates({ page: '0', size: '10' });
  }

  // MULTI SEARCH STARTING
  onSearch() {
    const searchQuery = this.searchText.trim().toLowerCase();
    if (searchQuery) {
      this.filteredItems = this.emailTemplateList.filter((item) => {
        // Convert all values of object into single string
        const itemData = Object.values(item).join(' ').toLowerCase();
        return itemData.includes(searchQuery);
      });
    } else {
      this.filteredItems = this.emailTemplateList;
    }
  }
  // MULTI SEARCH ENDING






  // ============================================================================================
  // MODEL PROPERTIES STARTING
  @ViewChild('proceedModel') proceedModel!: ElementRef;
  modelOpen() {
    const modal = new bootstrap.Modal(this.proceedModel.nativeElement);
    modal.show();
  }
  modelClose() {
    const modal = bootstrap.Modal.getInstance(this.proceedModel.nativeElement);
    modal?.hide();
  }
  // MODEL PROPERTIES ENDING
  // ============================================================================================
}
