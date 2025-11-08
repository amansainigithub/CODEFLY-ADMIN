import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { UnderReviewStageService } from '../../../_services/productStages/underReviewStageService/under-review-stage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ApprovedStageService } from '../../../_services/productStages/approvedStageService/approved-stage.service';
declare var bootstrap: any; // Declare bootstrap for accessing modal methods

@Component({
  selector: 'app-product-under-review',
  templateUrl: './product-under-review.component.html',
  styleUrl: './product-under-review.component.css',
})
export class ProductUnderReviewComponent {
  
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
      this.getUnderReviewProduct({ page: '0', size: '10' });
    }
  
    constructor(
      private toast: NgToastService,
      private spinner: NgxSpinnerService,
      private underReviewStageService: UnderReviewStageService,
      private router: Router
    ) {}
  
    getUnderReviewProduct(request: any) {
      this.spinner.show();
      this.underReviewStageService.getunderReviewStageData(request).subscribe({
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
      this.getUnderReviewProduct(request);
    }
  
  

    
  productId: any;
  variantId: any;
  productReview(productId: any, variantId: any) {
    this.productId = productId;
    this.variantId = variantId;
    this.modelOpen();
  }

  //STARTING PRODUCT EDIT MODE
  startProductEditMode() {
    this.modelClose();
    const productData = {
      productId: this.productId,
      variantId: this.variantId,
    };
    this.router.navigateByUrl('/admin/dashboard/product-review', {
      state: productData,
    });
  }

  
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




    //MODIFIED PRODUCT FILES STARTING
    modifiedProductFiles(productId: any) {
      alert('Navigating to Modified Product Files for Product ID: ' + productId);
      this.router.navigateByUrl('/admin/dashboard/modified-product-files', {
        state: { productId: productId },  
      });
    } 
    //MODIFIED PRODUCT FILES ENDING


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


  refeshPage() {
    this.getUnderReviewProduct({ page: '0', size: '10' });
  }


}


