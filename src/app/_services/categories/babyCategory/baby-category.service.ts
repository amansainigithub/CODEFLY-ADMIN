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
export class BabyCategoryService {

  constructor(private http: HttpClient , private toast:NgToastService) { }


  getBabyCategoryListService(): Observable<any> {
    return this.http.get(AUTH_API_PROTECTED + 'getBabyCategoryList', httpOptions);
  }

  deletebabyCategoryByIdService(childCategoryId:any): Observable<any> {
    return this.http.get(AUTH_API_PROTECTED + 'deleteBabyCategoryById/'+childCategoryId, httpOptions);
  }

  saveBabyCategoryService(data:any): Observable<any> {
    return this.http.post(AUTH_API_PROTECTED + 'saveBabyCategory',data, httpOptions);
  }

}
