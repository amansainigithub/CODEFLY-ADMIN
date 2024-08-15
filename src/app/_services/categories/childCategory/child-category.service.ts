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
export class ChildCategoryService {


  constructor(private http: HttpClient , private toast:NgToastService) { }

  saveChildCategoryService(data:any): Observable<any> {
    return this.http.post(AUTH_API_PROTECTED + 'saveChildCategory',data, httpOptions);
  }

  getChildCategoryListService(): Observable<any> {
    return this.http.get(AUTH_API_PROTECTED + 'getChildCategoryList', httpOptions);
  }


  deleteChildCategoryByIdService(parentCategoryId:any): Observable<any> {
    return this.http.get(AUTH_API_PROTECTED + 'deleteChildCategoryById/'+parentCategoryId, httpOptions);
  }

  getChildCategoryByIdService(childCategoryId:any): Observable<any> {
    return this.http.get(AUTH_API_PROTECTED + 'getChildCategoryById/'+childCategoryId, httpOptions);
  }


  updateChildCategory(data:any): Observable<any> {
    return this.http.post(AUTH_API_PROTECTED + 'updateChildCategory',data, httpOptions);
  }


  //Update File Parent
  updateChildFile(file:any,childCategoryId:any)
  {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(AUTH_API_PROTECTED+"updateChildCategoryFile/"+ childCategoryId,formData);
  }

}
