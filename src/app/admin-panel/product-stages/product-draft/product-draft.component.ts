import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductDraftService } from '../../../_services/productStages/productDraftService/product-draft.service';

@Component({
  selector: 'app-product-draft',
  templateUrl: './product-draft.component.html',
  styleUrl: './product-draft.component.css'
})
export class ProductDraftComponent {

  //Filter List For Searching
  filteredItems: any = [];

  //Product List
  productDraftList: any[] = [];
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  //SearchList
  searchText: string = '';

  ngOnInit(): void {
    this.getDraftProduct({ page: '0', size: '10' });
  }

  constructor(
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private productDraftService: ProductDraftService
  ) {}

  getDraftProduct(request: any) {
    this.spinner.show();
    this.productDraftService.getProductDraftService(request).subscribe({
      next: (res: any) => {
        this.productDraftList = res.data['content'];
        this.filteredItems = this.productDraftList;

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
    this.getDraftProduct(request);
  }

  //Search Starting

  // MULTI SEARCH STARTING
  onSearch() {
    const searchQuery = this.searchText.trim().toLowerCase();

    if (searchQuery) {
      this.filteredItems = this.productDraftList.filter((item) => {
        // Convert all values of object into single string
        const itemData = Object.values(item).join(' ').toLowerCase();
        return itemData.includes(searchQuery);
      });
    } else {
      this.filteredItems = this.productDraftList;
    }
  }
  // MULTI SEARCH ENDING

    refeshPage() {
    this.getDraftProduct({ page: '0', size: '10' });
  }
}
