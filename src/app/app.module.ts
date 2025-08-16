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
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminDashboardComponent } from './admin-panel/admin-dashboard/admin-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgToastModule } from 'ng-angular-popup';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomerComponent } from './admin-panel/users/customer/customer.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminComponent } from './admin-panel/users/admin/admin.component';
import { SellerComponent } from './admin-panel/users/seller/seller.component';
import { HsnCodesComponent } from './admin-panel/tax/hsn-codes/hsn-codes.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // For Native Date Adapter
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { ProductBrandComponent } from './admin-panel/Product-Matadata/product-brand/product-brand.component';
import { ProductMaterialComponent } from './admin-panel/Product-Matadata/product-material/product-material.component';
import { ProductTypeComponent } from './admin-panel/Product-Matadata/product-type/product-type.component';
import { ProductSizeComponent } from './admin-panel/Product-Matadata/product-size/product-size.component';
import { ProductNetQuantityComponent } from './admin-panel/Product-Matadata/product-net-quantity/product-net-quantity.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RootCategoryComponent } from './admin-panel/categories/root-category/root-category.component';
import { UpdateRootFileComponent } from './admin-panel/categories/root-category/update-root-file/update-root-file.component';
import { SubCategoryComponent } from './admin-panel/categories/sub-category/sub-category.component';
import { UpdateSubFileComponent } from './admin-panel/categories/sub-category/update-sub-file/update-sub-file.component';
import { TypeCategoryComponent } from './admin-panel/categories/type-category/type-category.component';
import { UpdateTypeFileComponent } from './admin-panel/categories/type-category/update-type-file/update-type-file.component';
import { VariantCategoryComponent } from './admin-panel/categories/variant-category/variant-category.component';
import { UpdateVariantFileComponent } from './admin-panel/categories/variant-category/update-variant-file/update-variant-file.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    AdminDashboardComponent,
    CustomerComponent,
    AdminComponent,
    SellerComponent,
    HsnCodesComponent,
    ProductBrandComponent,
    ProductMaterialComponent,
    ProductTypeComponent,
    ProductSizeComponent,
    ProductNetQuantityComponent,
    RootCategoryComponent,
    UpdateRootFileComponent,
    SubCategoryComponent,
    UpdateSubFileComponent,
    TypeCategoryComponent,
    UpdateTypeFileComponent,
    VariantCategoryComponent,
    UpdateVariantFileComponent,
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
    MatFormFieldModule,
    MatTooltipModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders, provideAnimationsAsync(), DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
