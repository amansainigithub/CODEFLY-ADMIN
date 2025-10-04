import { Component, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { UnderReviewStageService } from '../../../_services/productStages/underReviewStageService/under-review-stage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

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
  

 productReview(productId:any , variantId:any)
  {
    const productData = {
      productId: productId,
      variantId: variantId
    };
     this.router.navigateByUrl('/admin/dashboard/product-review', {state: productData});
  }

}
