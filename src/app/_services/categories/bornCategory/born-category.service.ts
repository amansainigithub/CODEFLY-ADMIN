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
export class BornCategoryService {

  constructor(private http: HttpClient , private toast:NgToastService) { }


  getBornCategoryListService(): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + "bornController/" + 'getBornCategoryList', httpOptions);
  }

  deletebornCategoryByIdService(bornCategoryId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + "bornController/" + 'deleteBornCategoryById/'+bornCategoryId, httpOptions);
  }


  saveBornCategoryService(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "bornController/" + 'saveBornCategory',data, httpOptions);
  }


  updatebornCategory(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + 'updateBornCategory',data, httpOptions);
  }

  getBornCategoryByIdService(bornCategoryId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + "bornController/" + 'getBornCategoryById/'+bornCategoryId, httpOptions);
  }


   //Update File Parent
   updateBornFile(file:any,bornCategoryId:any)
   {
     const formData: FormData = new FormData();
     formData.append('file', file);
     return this.http.post(API_AUTHORIZA_URL + "bornController/" + "updateBornCategoryFile/"+ bornCategoryId,formData);
   }


}
