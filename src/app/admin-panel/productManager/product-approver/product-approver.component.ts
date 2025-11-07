import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductApprovalService } from '../../../_services/productManagerService/productApprovalService/product-approval.service';
import { RootRejectionCategoryService } from '../../../_services/productManagerService/productRejectReasonService/rootRejectionCategoryService/root-rejection-category.service';
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

  //PRODUCT DIS APPROVED REASON
  rootRejectionCategoryData:any;
  
  //PRODUCT DIS APPROVED REASON
  disApprovReason:any;

  constructor(
    private spinner: NgxSpinnerService,
    private toast: NgToastService,
    private router: Router,
    private productApprovalService: ProductApprovalService,
    private rootRejectionCategoryService: RootRejectionCategoryService
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
      console.warn('Product ID not found or invalid!');
      this.productId = null;
      //this.router.navigateByUrl('/admin/dashboard');
    }
  }

  ngOnInit(){
    //RootRejectionCategoryService
    this.getRootRejectionCategoryData();
  }

//GET ROOT REJECTION REASON CATEOGRY DATA START
  getRootRejectionCategoryData() {
     this.rootRejectionCategoryService.getRootRejectionCategory().subscribe({
       next:(res:any)=> {
         this.rootRejectionCategoryData = res.data;
         this.toast.success({detail:"Success",summary:"Data retrieved successfully", position:"topRight",duration:2000});
       },
       error:(err:any)=>  {
         this.toast.error({detail:"Error",summary:err.error.data.message, position:"topRight",duration:2000});
         this.spinner.hide();
           }
         }
       );
     }


  //PRODUCT APPROVED STARTING
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

        if(err.error.data.message === 'First approve the main product, then approve the variant product.'){
          this.toast.error({detail: 'Error',
            summary: 'First approve the main product, then approve the variant product.',position: 'topRight',duration: 4000, });
        }else{
          this.toast.error({detail: 'Error',summary: 'Something went wrong',position: 'topRight',duration: 2000, });
        } 

        //Close Model
        this.approvedModelClose();
      },
    });
  }
  //PRODUCT APPROVED ENDING




  
// ===========================================================================================
// ===========================================================================================
  //Root Rejection Category
  rootRejectionCategoryObj: any = {
    rejectionRootCategory: null,
  };

  //Rejection Reason Category
   selectDisApproveReason: any = {
    selectedReason: null,
  };

  rootRejectionCategoryChange(data:any){
    //Find By Root Rejection Category
    this.findByRootRejectionCategory(data);
  }

  //GET REJECTION REASON LIST
  findByRootRejectionCategory(data:any) {

     this.productApprovalService.findByRootRejectionCategory(data.id).subscribe({
       next:(res:any)=> {
         this.disApprovReason = res.data;
         this.toast.success({detail:"Success",summary:"Data retrieved successfully", position:"bottomRight",duration:3000});
         
       },
       error:(err:any)=>  {
         this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
         this.spinner.hide();
         console.log(err);
           }
         }
       );
     }
//GET REJECTION REASON LIST


 
  disApprovedForm: any = {
    id: '',
    code: '',
    reason: '',
    category: '',
    description: '',
    rejectionRootCategory:''
  };

  onDisapproveReasonChange() {
    this.disApprovedForm.id = this.selectDisApproveReason.selectedReason.id;
    this.disApprovedForm.code = this.selectDisApproveReason.selectedReason.code;
    this.disApprovedForm.reason =this.selectDisApproveReason.selectedReason.reason;
    this.disApprovedForm.category =this.selectDisApproveReason.selectedReason.category;
    this.disApprovedForm.rejectionRootCategory =this.rootRejectionCategoryObj.selectedReason.rootRejectionCategory
  }



//PRODUCT DIS APPROVED STARTING
productDisApproved() {
  this.disApprovedModel = true;
  this.isLoading = true;
  this.progressValue = 0;

  //Start progress bar animation
  this.progressInterval = setInterval(() => {
    if (this.progressValue < 90) {
      this.progressValue += 5; // increase gradually
    }
  }, 300);

  this.productApprovalService.productDisApproved(this.productId , this.disApprovedForm.id , this.disApprovedForm.description , this.disApprovedForm.rejectionRootCategory ).subscribe({
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
//PRODUCT DIS APPROVED ENDING...












// ==========================================================================================
// ==========================================================================================

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
