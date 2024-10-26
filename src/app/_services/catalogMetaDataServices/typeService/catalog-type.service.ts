import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CatalogTypeService {

  constructor(private http: HttpClient , private toast:NgToastService) { }

  saveTypeService(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "catalogTypeController/" + 'saveCatalogType',data, httpOptions);
  }

    getTypeByPagination(request:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "catalogTypeController/"+ 'getCatalogType?page='+request.page + '&size=' +request.size, httpOptions);
    }

    getTypeByIdService(typeId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "catalogTypeController/" + 'getCatalogTypeById/'+typeId, httpOptions);
    }

    updateType(data:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "catalogTypeController/" + 'updateCatalogType',data, httpOptions);
    }

    deleteTypeByIdService(typeId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "catalogTypeController/" + 'deleteCatalogType/'+typeId, httpOptions);
    }
}
