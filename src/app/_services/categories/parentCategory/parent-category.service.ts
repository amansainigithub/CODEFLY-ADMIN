import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API_PROTECTED = 'http://localhost:8080/shopping/api/flying/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ParentCategoryService {

  constructor(private http: HttpClient) { }


  saveParentCategory(data:any): Observable<any> {
    return this.http.post(AUTH_API_PROTECTED + 'parentCategory',data, httpOptions);
  }

}
