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
export class ProductRejectReasonService {

  constructor(private http: HttpClient) {}

  
      saveRejectionReason(data:any): Observable<any> {
          return this.http.post(API_AUTHORIZA_URL + "productRejectionReasonController/" + 'createRejectionReason',data, httpOptions);
          }

      getRejectedReasonsService(): Observable<any> {
        return this.http.get(API_AUTHORIZA_URL + "productRejectionReasonController/" + 'getRejectionReasons', httpOptions);
      }

      getRejectionReasonByIdSerive(rejectionId:any): Observable<any> {
             return this.http.get(API_AUTHORIZA_URL + "productRejectionReasonController/" + 'getRejectionReasonById/'+rejectionId, httpOptions);
      }

      deleteRejectedReasonService(rejectionId:any): Observable<any> {
             return this.http.get(API_AUTHORIZA_URL + "productRejectionReasonController/" + 'deleteRejectionReason/'+rejectionId, httpOptions);
      }
      
        updateRejectionReason(data:any): Observable<any> {    
            return this.http.post(API_AUTHORIZA_URL + "productRejectionReasonController/"+ 'updateRejectionReason',data, httpOptions);
        }
}
