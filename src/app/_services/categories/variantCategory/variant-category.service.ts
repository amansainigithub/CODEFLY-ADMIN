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
export class VariantCategoryService {

  constructor(private http: HttpClient , private toast:NgToastService) { }
  
  
    getVariantCategoryListService(): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "variantCategoryController/" + 'getVariantCategoryList', httpOptions);
    }
  
    deleteVariantCategoryByIdService(bornCategoryId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "variantCategoryController/" + 'deleteVariantCategoryById/'+bornCategoryId, httpOptions);
    }
  
  
    saveVariantCategoryService(data:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "variantCategoryController/" + 'saveVariantCategory',data, httpOptions);
    }
  
    updateVariantCategoryNew(data:any): Observable<any> {    
      return this.http.post(API_AUTHORIZA_URL + "variantCategoryController/" +'updateBornCategoryNew',data);
    }
  
    updateVariantCategory(data:any): Observable<any> {    
      return this.http.post(API_AUTHORIZA_URL + "variantCategoryController/"+ 'updateVariantCategory',data, httpOptions);
    }
  
   
  
    getVariantCategoryByIdService(bornCategoryId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "variantCategoryController/" + 'getVariantCategoryById/'+bornCategoryId, httpOptions);
    }
  
  
     //Update File Parent
     updateVariantFile(file:any,bornCategoryId:any)
     {
       const formData: FormData = new FormData();
       formData.append('file', file);
       return this.http.post(API_AUTHORIZA_URL + "variantCategoryController/" + "updateVariantCategoryFile/"+ bornCategoryId,formData);
     }
  
     // Method to upload files with titles and descriptions
    uploadSampleFiles(formData: FormData,bornCategoryId:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "variantCategoryController/" + "productSampleFiles/"+bornCategoryId , formData);
    }
  
}
