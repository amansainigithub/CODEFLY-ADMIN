import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmailBucketService } from '../../../_services/emailBucket/emailBucketService/email-bucket.service';
import { PageEvent } from '@angular/material/paginator';

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

  emailTemplate: any = false;

  //Filter List For Searching
  filteredItems: any = [];

  //Product List
  emailTemplateList: any[] = [];
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  //SearchList
  searchText: string = '';

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
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
      this.template.bodyHtml
    );
  }

  getEmailTemplates(request: any) {
    this.spinner.show();
    this.emailBucketService.getEmailTemplates(request).subscribe({
      next: (res: any) => {
        this.emailTemplateList = res.data['content'];
        this.filteredItems = this.emailTemplateList;
        this.totalElements = res.data['totalElements'];
        this.toast.success({detail: 'Success', summary: 'Data Fetch Success',position: 'topRight',duration: 2000,});
        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err);
        this.spinner.hide();
        this.toast.error({detail: 'Error',summary: err,position: 'bottomRight', duration: 2000, });
      },
    });
  }

  nextPage(event: PageEvent) {
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getEmailTemplates(request);
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




    //SAVE EMAIL TEMPLATE START
    saveEmailTemplate() {
    this.emailBucketService.saveEmailTemplate(this.template).subscribe({
      next: (res: any) => {
        this.toast.success({detail: 'Success',summary: 'Data Saved Success',position: 'topRight', duration: 2000, });
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toast.error({ detail: 'Error',summary: err.error.data.message,position: 'topRight',duration: 2000,});
        this.spinner.hide();
        console.log(err);
      },
    });
  }
  //SAVE EMAIL TEMPLATE END

  showEmailTemplate() {
    if (!this.emailTemplate) {
      this.emailTemplate = true;
    } else {
      this.emailTemplate = false;
    }
    this.getEmailTemplates({ page: '0', size: '10' });
  }
}
