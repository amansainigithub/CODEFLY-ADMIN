import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UsersService } from '../../../_services/userService/users/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  isChecked = true;
  adminList:any;
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private userService:UsersService,
    private spinner: NgxSpinnerService,
    private toast:NgToastService) {}

  ngOnInit(): void {
    this.getAdminByPagination({ page: "0", size: "10" });
  }

  getAdminByPagination(request:any)
  {
    this.spinner.show();
    this.userService.getAdminByPagination(request)
    .subscribe(
      {
          next:(res:any)=> {
          this.adminList = res.data['content']
          this.totalElements = res.data['totalElements'];
          this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
          this.spinner.hide();
        },
        error:(err:any)=>  {
          console.log(err)
          this.spinner.hide();
        }
      }
    );
  }


  nextPage(event: PageEvent) {
    console.log(event);
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getAdminByPagination(request);
}


}
