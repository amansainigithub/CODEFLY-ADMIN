import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
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
import { UpdateChildFileComponent } from './admin-panel/categories/child-category/updateChildFile/update-child-file/update-child-file.component';
import { BabyCategoryComponent } from './admin-panel/categories/baby-category/baby-category.component';
import { UpdateBabyFileComponent } from './admin-panel/categories/baby-category/updateBabyFile/update-baby-file/update-baby-file.component';
import { BornCategoryComponent } from './admin-panel/categories/born-category/born-category.component';
import { UpdateBornFileComponent } from './admin-panel/categories/born-category/updateBornFile/update-born-file/update-born-file.component';
import { CustomerComponent } from './admin-panel/users/customer/customer.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AdminComponent } from './admin-panel/users/admin/admin.component';
import { SellerComponent } from './admin-panel/users/seller/seller.component';
import { HsnCodesComponent } from './admin-panel/tax/hsn-codes/hsn-codes.component';
import { CatalogInvestigationComponent } from './admin-panel/catalogCBI/catalog-investigation/catalog-investigation.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // For Native Date Adapter
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { ProductBrandComponent } from './admin-panel/Product-Matadata/product-brand/product-brand.component';
import { ProductMaterialComponent } from './admin-panel/Product-Matadata/product-material/product-material.component';
import { ProductTypeComponent } from './admin-panel/Product-Matadata/product-type/product-type.component';
import { ProductSizeComponent } from './admin-panel/Product-Matadata/product-size/product-size.component';
import { ProductNetQuantityComponent } from './admin-panel/Product-Matadata/product-net-quantity/product-net-quantity.component';
import { MappedSampleFilesComponent } from './admin-panel/categories/born-category/bornMappedFiles/mapped-sample-files/mapped-sample-files.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    AdminDashboardComponent,
    ParentCategoryComponent,
    ChildCategoryComponent,
    UpdateParentFileComponent,
    UpdateChildFileComponent,
    BabyCategoryComponent,
    UpdateBabyFileComponent,
    BornCategoryComponent,
    UpdateBornFileComponent,
    CustomerComponent,
    AdminComponent,
    SellerComponent,
    HsnCodesComponent,
    CatalogInvestigationComponent,
    ProductBrandComponent,
    ProductMaterialComponent,
    ProductTypeComponent,
    ProductSizeComponent,
    ProductNetQuantityComponent,
    MappedSampleFilesComponent,
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
     MatDialogModule,
     MatPaginatorModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatFormFieldModule
  ], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders, provideAnimationsAsync(),DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
