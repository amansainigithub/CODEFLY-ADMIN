import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductFilesService {

  constructor(private http: HttpClient) {}

    getProductFilesByIdService(productId:any): Observable<any> {
        return this.http.get(API_AUTHORIZA_URL + "productFilesManagerController/" + 'getProductFilesById/'+productId, httpOptions);
    }
  

   fileUploadService(formData:any ,productFileId:any,productId:any): Observable<any> {
  return this.http.post(API_AUTHORIZA_URL + "productFilesManagerController/" + 'uploadFiles/'+productFileId + "/" + productId, formData);
}

}
