import { Component, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApprovedStageService } from '../../../_services/productStages/approvedStageService/approved-stage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UnderReviewStageService } from '../../../_services/productStages/underReviewStageService/under-review-stage.service';

@Component({
  selector: 'app-product-approved',
  templateUrl: './product-approved.component.html',
  styleUrl: './product-approved.component.css',
})
export class ProductApprovedComponent {
  
}
