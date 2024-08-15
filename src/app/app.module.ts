import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminDashboardComponent } from './admin-panel/admin-dashboard/admin-dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { NgToastModule } from 'ng-angular-popup';
import { ParentCategoryComponent } from './admin-panel/categories/parent-category/parent-category.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ReactiveFormsModule} from '@angular/forms';
import { ChildCategoryComponent } from './admin-panel/categories/child-category/child-category.component';
import { UpdateParentFileComponent } from './admin-panel/categories/parent-category/updateParentFile/update-parent-file/update-parent-file.component';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BoardUserComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    ProfileComponent,
    HomeComponent,
    AdminDashboardComponent,
    ParentCategoryComponent,
    ChildCategoryComponent,
    UpdateParentFileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatMenuModule,
    MatBadgeModule,
    MatExpansionModule,
    NgToastModule,
    MatSlideToggleModule,
     ReactiveFormsModule,
     MatDialogModule
  ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
