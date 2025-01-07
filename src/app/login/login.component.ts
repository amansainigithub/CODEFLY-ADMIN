import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };

  pkey: any = {
    adminPasskey: null,
    };


  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  passkey =false;

  constructor(private authService: AuthService, 
              private tokenStorage: TokenStorageService, 
              private router:Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.spinner.show();

    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.passkey = true;
        this.spinner.hide();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.spinner.hide();
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  validatePasskey()
  { 
    this.spinner.show();

    const { username, password } = this.form;
    this.authService.passKey(username, password,this.pkey.adminPasskey).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
        
        this.spinner.hide();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.spinner.hide();
      }
    );
  }
}
