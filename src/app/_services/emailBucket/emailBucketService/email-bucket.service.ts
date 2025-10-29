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
    return this.http.post(
      API_AUTHORIZA_URL + 'emailTemplateController/' + 'createEmailTemplate',
      data,
      httpOptions
    );
  }
}
