import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UsersService } from '../../../_services/userService/users/users.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  isChecked = true;
  usersList:any;
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private userService:UsersService) {}

  ngOnInit(): void {
    this.getUserByPagination({ page: "0", size: "2" });
  }

  getUserByPagination(request:any)
  {
    this.userService.getUserByPagination(request)
    .subscribe(
      {
          next:(res:any)=> {
          this.usersList = res.data['content']
          this.totalElements = res.data['totalElements'];
        },
        error:(err:any)=>  {
          console.log(err)
        }
      }
    );
  }


  nextPage(event: PageEvent) {
    console.log(event);
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getUserByPagination(request);
}





}
