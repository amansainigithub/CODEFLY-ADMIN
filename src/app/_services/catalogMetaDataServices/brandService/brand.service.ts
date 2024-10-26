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
export class BrandService {

  
  constructor(private http: HttpClient , private toast:NgToastService) { }

  saveCatalogBrandService(data:any): Observable<any> {
    return this.http.post(API_AUTHORIZA_URL + "catalogBrandController/" + 'saveCatalogBrand',data, httpOptions);
  }

    //ADMIN
    getBrandByPagination(request:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "catalogBrandController/"+ 'getCatalogBrand?page='+request.page + '&size=' +request.size, httpOptions);
    }

    getBrandByIdService(brandId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "catalogBrandController/" + 'getCatalogBrandById/' + brandId, httpOptions);
    }

    updateBrand(data:any): Observable<any> {
      return this.http.post(API_AUTHORIZA_URL + "catalogBrandController/" + 'updateCatalogBrand',data, httpOptions);
    }

    deleteBrandByIdService(brandId:any): Observable<any> {
      return this.http.get(API_AUTHORIZA_URL + "catalogBrandController/" + 'deleteBrand/'+brandId, httpOptions);
    }
}
