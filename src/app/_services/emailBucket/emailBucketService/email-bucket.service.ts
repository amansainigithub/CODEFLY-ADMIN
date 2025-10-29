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
export class EmailBucketService {
  constructor(private http: HttpClient) {}

  saveEmailTemplate(data: any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + 'emailTemplateController/' + 'createEmailTemplate', data,httpOptions);
  }

  getEmailTemplates(request: any): Observable<any> {
    return this.http.get(API_AUTHORIZA_URL +'emailTemplateController/' +'getEmailTemplateData?page=' + request.page +'&size=' + request.size,httpOptions);
  }

  updateEmailTemplate(data: any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + 'emailTemplateController/' + 'updateEmailTemplate',data,httpOptions);
  }
}
