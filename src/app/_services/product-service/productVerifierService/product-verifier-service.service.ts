import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductVerifierServiceService {

  constructor(private http: HttpClient) { }

  getProductListVerifierService() {
    return this.http.get(API_AUTHORIZA_URL + `adminSellerProductVerifyController/getSellerProductVerifyList`);
  }

  getUnderReviewProductList(request:any) {
    return this.http.get(API_AUTHORIZA_URL + 'adminSellerProductVerifyController/getSellerProductUnderReviewList/'+"username"+"?page="+request.page +"&size="+request.size);
  }


}
