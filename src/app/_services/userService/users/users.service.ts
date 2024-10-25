import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient , private toast:NgToastService) { }

  //CUSTOMER
  getCustomerByPagination(request:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "usersController/"+ 'getCustomerByPagination?page='+request.page + '&size=' +request.size, httpOptions);
  }

  //SELLER
  getSellerByPagination(request:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "usersController/"+ 'getSellerByPagination?page='+request.page + '&size=' +request.size, httpOptions);
  }

  //ADMIN
  getAdminByPagination(request:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "usersController/"+ 'getAdminByPagination?page='+request.page + '&size=' +request.size, httpOptions);
  }

  

}
