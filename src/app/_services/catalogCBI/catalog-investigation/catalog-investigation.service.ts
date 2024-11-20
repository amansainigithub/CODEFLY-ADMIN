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
export class CatalogInvestigationService {

  constructor(private http: HttpClient , private toast:NgToastService) { }

    //ADMIN
    getProogressCatalogService(request:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "catalogCbiController/"+ 'getCatalogInProgressList?page='+request.page + '&size=' +request.size, httpOptions);
    }

    getCatalogMasters(){
      return this.http.get(API_AUTHORIZA_URL + 'catalogCbiController/getCatalogMasters');
    }


    //save Catalog Service
    updateCatalogService(updataForm:any, catalogId:any) {
    return this.http.post(API_AUTHORIZA_URL + 'catalogCbiController/catalogInvestigation/'+catalogId
      , updataForm );
  }

  
}
