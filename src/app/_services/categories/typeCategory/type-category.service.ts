import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class TypeCategoryService {


  constructor(private http: HttpClient , private toast:NgToastService) { }


  getTypeCategoryDataService(): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + "TypeCategoryController/" + 'getTypeCategoryList', httpOptions);
  }

  deleteTypeCategoryByIdService(babyCategoryId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + "TypeCategoryController/" +'deleteTypeCategoryById/'+babyCategoryId, httpOptions);
  }

  saveTypeCategoryService(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "TypeCategoryController/" + 'saveTypeCategory',data, httpOptions);
  }

  updateTypeCategory(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "TypeCategoryController/" + 'updateTypeCategory',data, httpOptions);
  }

  updatebabyCategoryNew(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "TypeCategoryController/" + 'updateBabyCategoryNew',data, httpOptions);
  }

  getTypeCategoryByIdService(babyCategoryId:any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL + "TypeCategoryController/" + 'getTypeCategoryById/'+babyCategoryId, httpOptions);
  }


  //Update File Parent
  updateTypeFile(file:any,typeCategoryId:any)
  {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(API_AUTHORIZA_URL  + "TypeCategoryController/" +  "updateTypeCategoryFile/"+ typeCategoryId,formData);
  }
}
