import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { DisApprovedStageService } from '../../../_services/productStages/disApprovedStageService/dis-approved-stage.service';

@Component({
  selector: 'app-product-dis-approved',
  templateUrl: './product-dis-approved.component.html',
  styleUrl: './product-dis-approved.component.css'
})
export class ProductDisApprovedComponent {

productDisApprovedList: any[] = [];

  //Filter List For Searching
  filteredItems: any = [];

  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  //SearchList
  searchText: string = '';

  ngOnInit(): void {
    this.getDisApprovedProduct({ page: '0', size: '10' });
  }

  constructor(
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private disApprovedStageService: DisApprovedStageService
  ) {}

  getDisApprovedProduct(request: any) {
    this.spinner.show();
    this.disApprovedStageService.getDisApprovedProductService(request).subscribe({
      next: (res: any) => {
        this.productDisApprovedList = res.data['content'];
        this.filteredItems = this.productDisApprovedList;

        this.totalElements = res.data['totalElements'];
        this.toast.success({detail: 'Success', summary: 'Data retrieved successfully',position: 'topRight',duration: 2000,});
        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err);
        this.spinner.hide();
        this.toast.error({detail: 'Error',summary: err,position: 'bottomRight', duration: 3000, });
      },
    });
  }

  nextPage(event: PageEvent) {
    console.log(event);
    const request: any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getDisApprovedProduct(request);
  }

  //Search Starting

  // MULTI SEARCH STARTING
  onSearch() {
  const searchQuery = this.searchText.trim().toLowerCase();

  if (searchQuery) {
    this.filteredItems = this.productDisApprovedList.filter((item) => {
      // Convert all values of object into single string
      const itemData = Object.values(item).join(' ').toLowerCase();
      return itemData.includes(searchQuery);
    });
  } else {
    this.filteredItems = this.productDisApprovedList;
  }
}
 // MULTI SEARCH ENDING
}
