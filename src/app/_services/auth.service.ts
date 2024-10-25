import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_PUBIC_URL } from '../constants/Constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(API_PUBIC_URL + 'adminAuthController/'+ 'adminSignin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(API_PUBIC_URL + "adminAuthController/"+  'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  passKey(username: string, password: string,passKey: string): Observable<any> {
    return this.http.post(API_PUBIC_URL + "adminAuthController/"+  'adminPassKey', {
      username,
      password,
      passKey
    }, httpOptions);
  }
}
