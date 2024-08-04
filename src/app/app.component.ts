import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgToastService } from 'ng-angular-popup';

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

  constructor(
    private tokenStorageService: TokenStorageService,
    private router:Router,
    private spinner: NgxSpinnerService,
    private toast:NgToastService) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
      this.router.navigate(['/admin/dashboard']);
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

}
