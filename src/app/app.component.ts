import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgToastService } from 'ng-angular-popup';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showFiller = false;
  title = 'JET-ANGULAR-2';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  //TIMER LIVE
  currentTime: string = '';
  private intervalId: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router:Router,
    private activateRouter:ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toast:NgToastService) {
     }

  ngOnInit(): void { 

    // FOR TIMER
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
      // this.router.navigate(['/admin/dashboard']);
    }

  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  

  genToast(){
    this.toast.success({detail:"Success",summary:"This is Success", position:"topRight",duration:3000})
    // this.toast.warning({detail:"Warning",summary:"This is Success", position:"botomCenter",duration:3000})
  }

  isSidebarVisible = true; // Initial state of the sidebar

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }


  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }


  routingFix(){
    this.router.navigate(["/admin/dashboard/child-category"])
  }


  isCategoriesOpen = false;
  isUsersOpen = false;
  isCatalogMeta = false;
  isProductInvestigation = false;
  isProductReviews = false;
  toggleSubmenu(menu:any) {
    if (menu === 'categories') {
      this.isCategoriesOpen = !this.isCategoriesOpen;
    } else if (menu === 'users') {
      this.isUsersOpen = !this.isUsersOpen;
    }else if (menu === 'catalogMeta') {
      this.isCatalogMeta = !this.isCatalogMeta;
    }else if (menu === 'productInvestigation') {
      this.isProductInvestigation = !this.isProductInvestigation;
    }else if (menu === 'productReviews') {
      this.isProductReviews = !this.isProductReviews;
    }
  }

  
}
