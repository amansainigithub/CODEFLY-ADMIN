import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})


export class AdminGuardService implements CanActivate  {

  
TOKEN_KEY = 'auth-token';
  
  constructor(private tokenStorage: TokenStorageService,private _router:Router)
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      if(window.localStorage.getItem(this.TOKEN_KEY) == null || window.localStorage.getItem(this.TOKEN_KEY) == undefined)
      {
        //Return False if sessionStorage is Empty
        this._router.navigateByUrl("/");
        return false;
      }
      else{
        //Return False if sessionStorage is !Empty
        return true;
      }
  }
}
