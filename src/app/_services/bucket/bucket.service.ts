import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AUTH_API_PROTECTED = 'http://localhost:8080/shopping/api/flying/v1/';


@Injectable({
  providedIn: 'root'
})
export class BucketService {

  

  constructor( 
    private http: HttpClient) { }

    uploadFile(file:any)
    {
      const formData: FormData = new FormData();
      formData.append('file', file);
      return this.http.post(AUTH_API_PROTECTED+"uploadFile",formData);
    }
}
