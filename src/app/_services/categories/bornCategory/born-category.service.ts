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
export class BornCategoryService {

  constructor(private http: HttpClient , private toast:NgToastService) { }


  getBornCategoryListService(): Observable<any> {
    return this.http.get(AUTH_API_PROTECTED + 'getBornCategoryList', httpOptions);
  }

  deletebornCategoryByIdService(bornCategoryId:any): Observable<any> {
    return this.http.get(AUTH_API_PROTECTED + 'deleteBornCategoryById/'+bornCategoryId, httpOptions);
  }


  saveBornCategoryService(data:any): Observable<any> {
    return this.http.post(AUTH_API_PROTECTED + 'saveBornCategory',data, httpOptions);
  }


  updatebornCategory(data:any): Observable<any> {
    return this.http.post(AUTH_API_PROTECTED + 'updateBornCategory',data, httpOptions);
  }

  getBornCategoryByIdService(bornCategoryId:any): Observable<any> {
    return this.http.get(AUTH_API_PROTECTED + 'getBornCategoryById/'+bornCategoryId, httpOptions);
  }


   //Update File Parent
   updateBornFile(file:any,bornCategoryId:any)
   {
     const formData: FormData = new FormData();
     formData.append('file', file);
     return this.http.post(AUTH_API_PROTECTED+"updateBornCategoryFile/"+ bornCategoryId,formData);
   }


}
