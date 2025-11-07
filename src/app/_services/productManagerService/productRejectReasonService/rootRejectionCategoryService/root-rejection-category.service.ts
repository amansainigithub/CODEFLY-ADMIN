import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_AUTHORIZA_URL } from '../../../../constants/Constants';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class RootRejectionCategoryService {

  constructor(private http: HttpClient) {}
  
    
        saveRootRejectionCategory(data:any): Observable<any> {
            return this.http.post(API_AUTHORIZA_URL + "rootRejectionCategoryController/" + 'createRootRejectionCategory',data, httpOptions);
            }
  
        getRootRejectionCategory(): Observable<any> {
          return this.http.get(API_AUTHORIZA_URL + "rootRejectionCategoryController/" + 'getRootRejectionCategory', httpOptions);
        }
  
        getRootCategoryRejectionById(rejectionId:any): Observable<any> {
               return this.http.get(API_AUTHORIZA_URL + "rootRejectionCategoryController/" + 'getRootRejectionCategoryById/'+rejectionId, httpOptions);
        }
  
        deleteRootRejectionCategory(rejectionId:any): Observable<any> {
               return this.http.get(API_AUTHORIZA_URL + "rootRejectionCategoryController/" + 'deleteRootRejectionCategory/'+rejectionId, httpOptions);
        }
        
          updateRootRejectionCategory(data:any): Observable<any> {    
              return this.http.post(API_AUTHORIZA_URL + "rootRejectionCategoryController/"+ 'updateRootRejectionCategory',data, httpOptions);
          }
}
