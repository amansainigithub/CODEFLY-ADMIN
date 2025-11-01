import { Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApprovedStageService } from '../../../_services/productStages/approvedStageService/approved-stage.service';
@Component({
  selector: 'app-product-approved',
  templateUrl: './product-approved.component.html',
  styleUrl: './product-approved.component.css',
})
export class ProductApprovedComponent {
  
  //Filter List For Searching
  filteredItems: any = [];

  //Product List
  productApprovedList: any[] = [];
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  //SearchList
  searchText: string = '';

  ngOnInit(): void {
    this.getApprovedProduct({ page: '0', size: '10' });
  }

  constructor(
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private approvedStageService: ApprovedStageService
  ) {}

  getApprovedProduct(request: any) {
    this.spinner.show();
    this.approvedStageService.getApprovedProductService(request).subscribe({
      next: (res: any) => {
        this.productApprovedList = res.data['content'];
        this.filteredItems = this.productApprovedList;

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
    // console.log(event);
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getApprovedProduct(request);
  }

  //Search Starting

  // MULTI SEARCH STARTING
  onSearch() {
    const searchQuery = this.searchText.trim().toLowerCase();

    if (searchQuery) {
      this.filteredItems = this.productApprovedList.filter((item) => {
        // Convert all values of object into single string
        const itemData = Object.values(item).join(' ').toLowerCase();
        return itemData.includes(searchQuery);
      });
    } else {
      this.filteredItems = this.productApprovedList;
    }
  }
  // MULTI SEARCH ENDING


  refeshPage() {
    this.getApprovedProduct({ page: '0', size: '10' });
  }
}
