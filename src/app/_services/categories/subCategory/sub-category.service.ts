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
export class SubCategoryService {

  
    constructor(private http: HttpClient , private toast:NgToastService) { }
  
    saveSubCategoryService(data:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL +"subCategoryController/"+  'saveSubCategory',data, httpOptions);
    }
  
    getSubCategoryDataService(): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL +"subCategoryController/"+ 'getSubCategoryList', httpOptions);
    }
  
  
    deleteSubCategoryByIdService(parentCategoryId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL +"subCategoryController/"+ 'deleteSubCategoryById/'+parentCategoryId, httpOptions);
    }
  
    getSubCategoryByIdService(subCategoryId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL +"subCategoryController/"+ 'getSubCategoryById/'+subCategoryId, httpOptions);
    }
  
  
    updateSubCategory(data:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL +"subCategoryController/"+ 'updateSubCategory',data, httpOptions);
    }
  
  
    //Update File Parent
    updateSubFile(file:any,childCategoryId:any)
    {
      const formData: FormData = new FormData();
      formData.append('file', file);
      return this.http.post(API_AUTHORIZA_URL  +"subCategoryController/"+   "updateSubCategoryFile/"+ childCategoryId,formData);
    }

}
