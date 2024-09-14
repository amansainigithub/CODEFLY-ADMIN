import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../../../_services/userService/users/users.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent {

  
  isChecked = true;
  sellerList:any;
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private userService:UsersService,
    private spinner: NgxSpinnerService,
    private toast:NgToastService
  ) {}

  ngOnInit(): void {
    this.getCustomerByPagination({ page: "0", size: "10" });
  }

  getCustomerByPagination(request:any)
  {
    this.spinner.show();
    this.userService.getSellerByPagination(request)
    .subscribe(
      {
          next:(res:any)=> {
          this.sellerList = res.data['content']
          this.totalElements = res.data['totalElements'];
          this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
          this.spinner.hide();
        },
        error:(err:any)=>  {
          console.log(err);
          this.spinner.hide();
          this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        }
      }
    );
  }


  nextPage(event: PageEvent) {
    console.log(event);
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getCustomerByPagination(request);
}




}
