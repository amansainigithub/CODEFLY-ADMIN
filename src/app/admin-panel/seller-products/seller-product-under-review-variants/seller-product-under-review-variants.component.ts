import { Component, ElementRef, ViewChild } from '@angular/core';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { ProductVerifierServiceService } from '../../../_services/product-service/productVerifierService/product-verifier-service.service';
import { PageEvent } from '@angular/material/paginator';

// Import Bootstrap's Modal class
declare var bootstrap: any;

@Component({
  selector: 'app-seller-product-under-review-variants',
  templateUrl: './seller-product-under-review-variants.component.html',
  styleUrl: './seller-product-under-review-variants.component.css'
})
export class SellerProductUnderReviewVariantsComponent {

  @ViewChild('proccedBox') proceedBox!: ElementRef;

  verificationData:any[]=[];
  capturedResult:any =false;
  filteredItems:any;
  totalElements:any;
  //SearchList
  searchText: string = '';

   constructor(private tokenStorage: TokenStorageService, 
               private toast:NgToastService,
               private activateRoute: ActivatedRoute,
               private router: Router,
               private spinner: NgxSpinnerService,
               private http: HttpClient,
              private productVerfierService:ProductVerifierServiceService) {    
               }

 
  ngOnInit(): void 
  {
   this.getProductListVerifier({ page: "0", size: "10" }) ;
  }

  toggleRow(row: any): void {
    row.isExpanded = !row.isExpanded;
  }

  getProductListVerifier(request:any){
    this.productVerfierService.getProductListVerifierService(request).subscribe((res: any) => {

      console.log(res);
      
      this.verificationData = res.data.content;
      this.capturedResult = true;
      this.filteredItems  = this.verificationData;
          this.totalElements = res.data['totalElements'];
          this.spinner.hide();
  });
}

 nextPagePending(event: PageEvent) {
      console.log(event);
      const request:any = {};
      request['page'] = event.pageIndex.toString();
      request['size'] = event.pageSize.toString();
      this.getProductListVerifier(request);
      }


// Logic to open the modal
cVariantId:any
variantProceedBoxOpen(variantId:any): void {
  this.cVariantId = variantId;

  const modal = new bootstrap .Modal(this.proceedBox.nativeElement);
  modal.show(); // Open the modal
}

variantEditModeProceed(){
  if( this.cVariantId !== null ||  this.cVariantId !== ""){
    this.router.navigate(['admin/dashboard/product-checking', this.cVariantId]); 
  }else{
    alert("please Enter a Valid Varinat ID :: " +  this.cVariantId);
  }
}



//Search Starting
onSearch() {
  const searchQuery = this.searchText.trim().toLowerCase();
  if (searchQuery) {
  this.filteredItems = this.verificationData.filter(item => 
  String(item.productName).toLowerCase().includes(searchQuery)
  );
  } else {
  this.filteredItems = this.verificationData;
  }
  }
  //Search Ending


//Search Ending

}
