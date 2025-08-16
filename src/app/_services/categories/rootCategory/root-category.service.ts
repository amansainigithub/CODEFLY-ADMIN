import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RootCategoryService {

 
   constructor(private http: HttpClient , private toast:NgToastService) { }
 

   getRootListService(): Observable<any> {
     return this.http.get(API_AUTHORIZA_URL + "rootCategoryController/" + 'getRootCategoryList', httpOptions);
   }
 
   saveRootCategory(data:any): Observable<any> {
     return this.http.post(API_AUTHORIZA_URL + "rootCategoryController/" + 'createRootCategory',data, httpOptions);
   }
 
   deleteRootCategoryService(parentCategoryId:any): Observable<any> {
     return this.http.get(API_AUTHORIZA_URL + "rootCategoryController/" + 'deleteRootCategoryById/'+parentCategoryId, httpOptions);
   }
 
   getRootCategoryByIdService(parentCategoryId:any): Observable<any> {
     return this.http.get(API_AUTHORIZA_URL + "rootCategoryController/" + 'getRootCategoryById/'+parentCategoryId, httpOptions);
   }
 
   updateRootCategory(data:any): Observable<any> {
     return this.http.post(API_AUTHORIZA_URL + "rootCategoryController/" + 'updateRootCategory',data, httpOptions);
   }
 
   updateRootFile(file:any,parentCategoryid:any)
   {
     const formData: FormData = new FormData();
     formData.append('file', file);
     return this.http.post(API_AUTHORIZA_URL + "rootCategoryController/" + "updateRootCategoryFile/"+ parentCategoryid,formData);
   }

}
