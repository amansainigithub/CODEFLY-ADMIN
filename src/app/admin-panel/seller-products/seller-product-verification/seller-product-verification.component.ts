import { Component, ElementRef, ViewChild } from '@angular/core';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { ProductVerifierServiceService } from '../../../_services/product-service/productVerifierService/product-verifier-service.service';

// Import Bootstrap's Modal class
declare var bootstrap: any;

@Component({
  selector: 'app-seller-product-verification',
  templateUrl: './seller-product-verification.component.html',
  styleUrl: './seller-product-verification.component.css'
})
export class SellerProductVerificationComponent {


  @ViewChild('proccedBox') proceedBox!: ElementRef;

  dataCaptured:any;
  capturedResult:any =false;

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
   this.getProductListVerifier() ;
  }

  toggleRow(row: any): void {
    row.isExpanded = !row.isExpanded;
  }

  getProductListVerifier(){
    this.productVerfierService.getProductListVerifierService().subscribe((res: any) => {
      this.dataCaptured = res.data;
      this.capturedResult = true;
  });
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
    this.router.navigate(['seller/dashboard/home/variantComplete', this.cVariantId]); 
  }else{
    alert("please Enter a Valid Varinat ID :: " +  this.cVariantId);
  }
}


}
