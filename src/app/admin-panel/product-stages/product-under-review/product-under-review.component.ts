import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { UnderReviewStageService } from '../../../_services/productStages/underReviewStageService/under-review-stage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
declare var bootstrap: any; // Declare bootstrap for accessing modal methods

@Component({
  selector: 'app-product-under-review',
  templateUrl: './product-under-review.component.html',
  styleUrl: './product-under-review.component.css'
})
export class ProductUnderReviewComponent {


  constructor(
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private underReviewService:UnderReviewStageService,
    private router: Router
    
  ) {}

  ngOnInit() {
    this.productUnderReviewStage();
  }

  displayedColumns: string[] = [
    'id',
    'productMainFile',
    'productName',
    'productStatus',
    'productKey',
    'userId',
    'productDate',
    'productTime',
    'variantId',
    'productSeries',
    'review'
  ];

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productUnderReviewStage() {
    this.underReviewService.productUnderReviewStage().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator; // ✅ client-side pagination
        this.dataSource.sort = this.sort; // ✅ sorting
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // filter ke baad page reset
    }
  }
  

  productId:any;
  variantId:any;
 productReview(productId:any , variantId:any)
  {
    this.productId = productId;
    this.variantId = variantId;
    this.modelOpen();
  }
startProductEditMode()
{
    this.modelClose();
    const productData = { productId: this.productId , variantId: this.variantId };
    this.router.navigateByUrl('/admin/dashboard/product-review', {state: productData});
}


//REFRESH UNDER REVIEW DATA
refreshUnderReview(){
  this.productUnderReviewStage();
}

  
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
