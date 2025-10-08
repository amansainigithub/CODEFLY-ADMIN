import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ProductApprovalService {

    constructor(private http: HttpClient) { }

    productApproved(productId:any): Observable<any> {
        return this.http.post(API_AUTHORIZA_URL + "productApprovalController/" + 'productApproved/' + productId , "", httpOptions);
    }

    productDisApproved(productId:any , disApprovedReasonId:any ,description:any): Observable<any> {
        return this.http.post(API_AUTHORIZA_URL + "productApprovalController/" + 'productDisApproved/' + productId +
                             "/" + disApprovedReasonId + "/" + description , "", httpOptions);
    }

    getRejectionReasonList(): Observable <any> {
    return this.http.get( API_AUTHORIZA_URL + 'productApprovalController/getRejectionReasonsList' );
  }
}
