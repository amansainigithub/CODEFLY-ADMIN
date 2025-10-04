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
export class ProductDataService {
  constructor(private http: HttpClient) {}

  loadProductDetails(productId: any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL +'productManagerController/' +'retrieveProductDetails/' +productId,httpOptions);
  }

  updateProductDetails(productData: any , productId: any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL +'productManagerController/updateProductDetails/' + productId , productData);
  }
}
