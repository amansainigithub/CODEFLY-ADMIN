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
export class ProductApprovalServiceService {

  constructor(private http: HttpClient , private toast:NgToastService) { }

  productApproval(productId:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "productApprovalController/" + 'productApproved/'+productId,"", httpOptions);
  }


}
