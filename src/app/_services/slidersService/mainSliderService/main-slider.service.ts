import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { API_AUTHORIZA_URL } from '../../../constants/Constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class MainSliderService {
  constructor(private http: HttpClient, private toast: NgToastService) {}

  saveMainSliderService(data: any): Observable<any> {
    return this.http.post(
      API_AUTHORIZA_URL + 'sliderController/' + 'createSlider',
      data,
      httpOptions
    );
  }

  getSliderDataService(): Observable<any> {
    return this.http.get(
      API_AUTHORIZA_URL + 'sliderController/' + 'getSlidersList',
      httpOptions
    );
  }

  getSliderByIdService(sliderId: any): Observable<any> {
    return this.http.get(
      API_AUTHORIZA_URL + 'sliderController/' + 'getSliderById/' + sliderId,
      httpOptions
    );
  }

  updateSlider(data: any): Observable<any> {
    return this.http.post(
      API_AUTHORIZA_URL + 'sliderController/' + 'updateSlider',
      data,
      httpOptions
    );
  }

  deleteSliderById(sliderId: any): Observable<any> {
    return this.http.get(
      API_AUTHORIZA_URL + 'sliderController/' + 'deleteSliderById/' + sliderId,
      httpOptions
    );
  }


     //Update File Parent
    updateSliderFile(file:any,sliderId:any)
    {
      const formData: FormData = new FormData();
      formData.append('file', file);
      return this.http.post(API_AUTHORIZA_URL  +"sliderController/"+   "updateSliderFile/"+ sliderId,formData);
    }
}
