import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductApprovalService } from '../../../_services/productManagerService/productApprovalService/product-approval.service';
declare var bootstrap: any; // Declare bootstrap for accessing modal methods

@Component({
  selector: 'app-product-approver',
  templateUrl: './product-approver.component.html',
  styleUrl: './product-approver.component.css',
})
export class ProductApproverComponent {
  productId: any;

  //APPROVED MODEL
  approvedModel:boolean = false;

  //DIS-APPROVED MODEL
  disApprovedModel: boolean = false;

  isLoading: boolean = false;
  progressValue: number = 0;
  progressInterval: any;

  constructor(
    private spinner: NgxSpinnerService,
    private toast: NgToastService,
    private router: Router,
    private productApprovalService: ProductApprovalService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { productId: any };

    if (
      state &&
      state.productId !== null &&
      state.productId !== undefined &&
      state.productId !== ''
    ) {
      this.productId = state.productId;
      console.log('Product ID:', this.productId);
    } else {
      console.warn('⚠️ Product ID not found or invalid!');
      this.productId = null;
      //this.router.navigateByUrl('/admin/dashboard');
    }
  }

  //PRODUCT APPROVED
  productApproved() {

    this.approvedModel = true;
    this.isLoading = true;
    this.progressValue = 0;

      // ✅ Start progress bar animation
      this.progressInterval = setInterval(() => {
        if (this.progressValue < 90) {
          this.progressValue += 5; // increase gradually
        }
      }, 300);

    this.productApprovalService.productApproved(this.productId).subscribe({
      next: (res: any) => {
        clearInterval(this.progressInterval);
        this.progressValue = 100; // complete
        setTimeout(() => {
        this.isLoading = false;
        this.toast.success({detail: 'Success',summary: 'Product Approved Successfully',position: 'topRight',duration: 2000,});

        this.approvedModelClose();
        this.router.navigateByUrl('/admin/dashboard/product-under-review');
      }, 500);
      },
      error: (err: any) => {
        clearInterval(this.progressInterval);
        this.isLoading = false;
        this.progressValue = 0;
        this.toast.error({detail: 'Error',summary: 'Something went wrong',position: 'topRight',duration: 2000, });
        console.log(err);

        //Close Model
        this.approvedModelClose();
      },
    });
  }







//PRODUCT DIS APPROVED REASON
disApprovReason:any = [
  { id: 1, code: 'IMG_QUALITY_LOW', reason: 'Product images are of low quality or blurry.', category: 'Image Issue' },
  { id: 2, code: 'IMG_POLICY_VIOLATION', reason: 'Images violate listing policy (contains watermark, logo, or text).', category: 'Image Issue' },
  { id: 3, code: 'DESC_MISMATCH', reason: 'Product description does not match the actual product.', category: 'Content Issue' },
  { id: 4, code: 'CATEGORY_INCORRECT', reason: 'Product is listed under the wrong category.', category: 'Listing Issue' },
  { id: 5, code: 'PRICE_ERROR', reason: 'Incorrect or unrealistic pricing information.', category: 'Pricing Issue' },
  { id: 6, code: 'POLICY_VIOLATION', reason: 'Product violates platform listing or legal policies.', category: 'Policy Issue' },
  { id: 7, code: 'BRAND_UNAUTHORIZED', reason: 'Unauthorized usage of brand name or logo.', category: 'Brand Issue' },
  { id: 8, code: 'DUPLICATE_LISTING', reason: 'Duplicate listing of the same product found.', category: 'Listing Issue' },
  { id: 9, code: 'INCOMPLETE_DETAILS', reason: 'Important product details (size, color, material) are missing.', category: 'Information Issue' },
  { id: 10, code: 'FAKE_PRODUCT', reason: 'Product appears to be counterfeit or fake.', category: 'Compliance Issue' }
];


  //DIS-APPROVED FORM
  selectDisApproveReason: any = {
    selectedReason: null,
  };
  disApprovedForm: any = {
    id: '',
    code: '',
    reason: '',
    category: '',
    description: '',
  };

  onDisapproveReasonChange() {
    this.disApprovedForm.id = this.selectDisApproveReason.selectedReason.id;
    this.disApprovedForm.code = this.selectDisApproveReason.selectedReason.code;
    this.disApprovedForm.reason =this.selectDisApproveReason.selectedReason.reason;
    this.disApprovedForm.category =this.selectDisApproveReason.selectedReason.category;
  }



productDisApproved() {
  this.disApprovedModel = true;
  this.isLoading = true;
  this.progressValue = 0;

  // ✅ Start progress bar animation
  this.progressInterval = setInterval(() => {
    if (this.progressValue < 90) {
      this.progressValue += 5; // increase gradually
    }
  }, 300);

  this.productApprovalService.productDisApproved(this.productId).subscribe({
    next: (res: any) => {
      clearInterval(this.progressInterval);
      this.progressValue = 100; // complete
      setTimeout(() => {
        this.isLoading = false;
        this.toast.success({detail: 'Success',summary: 'Product Disapproved Successfully',position: 'topRight',duration: 2000,});

        this.disApprovedModelClose();
        this.router.navigateByUrl('/admin/dashboard/product-under-review');
      }, 500);
    },
    error: (err: any) => {
      clearInterval(this.progressInterval);
      this.isLoading = false;
      this.progressValue = 0;
      this.toast.error({detail: 'Error',summary: 'Something went wrong',position: 'topRight',duration: 2000, });
      console.log(err);

      //Close Model
      this.disApprovedModelClose();
    },
  });
}





  // MODEL APPROVED MODEL PROPERTIES STARTING
  @ViewChild('APPROVED') APPROVED!: ElementRef;
  approvedModelOpen() {
    const modal = new bootstrap.Modal(this.APPROVED.nativeElement);
    modal.show();
  }
  approvedModelClose() {
    const modal = bootstrap.Modal.getInstance(this.APPROVED.nativeElement);
    modal?.hide();
  }
  // MODEL APPROVED MODEL PROPERTIES ENDING



  // MODEL DIS-APPROVED MODEL PROPERTIES STARTING
  @ViewChild('DISAPPROVED') DISAPPROVED!: ElementRef;
  disApprovedModelOpen() {
    const modal = new bootstrap.Modal(this.DISAPPROVED.nativeElement);
    modal.show();
  }
  disApprovedModelClose() {
    const modal = bootstrap.Modal.getInstance(this.DISAPPROVED.nativeElement);
    modal?.hide();
  }
  // MODEL DIS-APPROVED   MODEL PROPERTIES ENDING
}
