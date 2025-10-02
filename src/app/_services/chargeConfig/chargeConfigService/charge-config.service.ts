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
export class ChargeConfigService {

  constructor(private http: HttpClient) { }


   saveChargeConfig(data:any): Observable<any> {
        return this.http.post(API_AUTHORIZA_URL + "chargeConfigController/" + 'createChargeConfig',data, httpOptions);
      }


  getChargeConfigListService(): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "chargeConfigController/" + 'getChargeConfigList', httpOptions);
  }

  deleteChargeService(chargeId:any): Observable<any> {
        return this.http.get(API_AUTHORIZA_URL + "chargeConfigController/" + 'deleteChargeConfig/'+chargeId, httpOptions);
      }

  getChargeByIdService(chargeId:any): Observable<any> {
       return this.http.get(API_AUTHORIZA_URL + "chargeConfigController/" + 'getChargeConfigById/'+chargeId, httpOptions);
  }

  updateCharge(data:any): Observable<any> {    
      return this.http.post(API_AUTHORIZA_URL + "chargeConfigController/"+ 'updateChargeConfig',data, httpOptions);
  }
}
