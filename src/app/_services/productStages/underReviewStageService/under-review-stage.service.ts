import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UnderReviewStageService {

   constructor(private http: HttpClient) { }

     getunderReviewStageData(request: any): Observable<any> {
        return this.http.get(API_AUTHORIZA_URL + 'productUnderReviewStageController/'
           + 'productUnderReviewStage?page=' + request.page + '&size=' + request.size , httpOptions);
      }
}
