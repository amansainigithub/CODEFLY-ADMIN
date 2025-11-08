import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class ProductBlockedService {

    constructor(private http: HttpClient) {}
     
       getBlockedProductService(request: any): Observable<any> {
         return this.http.get(API_AUTHORIZA_URL + 'productBlockedStageController/'
            + 'productBlockedStage?page=' + request.page + '&size=' + request.size , httpOptions);
       }
}
