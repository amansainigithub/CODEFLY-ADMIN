import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

const AUTH_API_PROTECTED = 'http://localhost:8080/shopping/api/flying/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient , private toast:NgToastService) { }

  
  getUserByPagination(request:any): Observable<any> {
    return this.http.post(AUTH_API_PROTECTED + 'getCustomerByPagination?page='+request.page + '&size=' +request.size, httpOptions);
    // return this.http.get(this.API_URL.API_URL+ "/getCategoryListBySortOrderAsc?page="+request.page + "&size=" +request.size);
  }

}
