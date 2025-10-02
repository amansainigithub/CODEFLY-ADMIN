import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminGuardService } from './authGuards/adminGuards/admin-guard.service';
import { CustomerComponent } from './admin-panel/users/customer/customer.component';
import { AdminComponent } from './admin-panel/users/admin/admin.component';
import { SellerComponent } from './admin-panel/users/seller/seller.component';
import { HsnCodesComponent } from './admin-panel/hsn-codes/hsn-codes.component';
import { ProductBrandComponent } from './admin-panel/Product-Matadata/product-brand/product-brand.component';
import { ProductMaterialComponent } from './admin-panel/Product-Matadata/product-material/product-material.component';
import { ProductTypeComponent } from './admin-panel/Product-Matadata/product-type/product-type.component';
import { ProductSizeComponent } from './admin-panel/Product-Matadata/product-size/product-size.component';
import { ProductNetQuantityComponent } from './admin-panel/Product-Matadata/product-net-quantity/product-net-quantity.component';
import { RootCategoryComponent } from './admin-panel/categories/root-category/root-category.component';
import { SubCategoryComponent } from './admin-panel/categories/sub-category/sub-category.component';
import { TypeCategoryComponent } from './admin-panel/categories/type-category/type-category.component';
import { VariantCategoryComponent } from './admin-panel/categories/variant-category/variant-category.component';

const routes: Routes = [
// { path: 'register', component: RegisterComponent },
{ path: '', component: LoginComponent },

{
  path: 'admin/dashboard',canActivate:[AdminGuardService] ,
      children: [
                  //ADMIN PANEL
                  // { path: '', component: AdminDashboardComponent},
                  { path: 'profile', component: ProfileComponent },
                  { path: 'customer-node', component: CustomerComponent , pathMatch:'full' },
                  { path: 'seller-node', component: SellerComponent , pathMatch:'full' },
                  { path: 'admin-node', component: AdminComponent , pathMatch:'full' },
                  // HSN codes
                  { path: 'hsnCodes', component: HsnCodesComponent , pathMatch:'full' },
                  // new Code Implemented
                  { path: 'brand', component: ProductBrandComponent , pathMatch:'full' },
                  { path: 'material', component: ProductMaterialComponent , pathMatch:'full' },
                  { path: 'type', component: ProductTypeComponent , pathMatch:'full' },
                  { path: 'size', component: ProductSizeComponent , pathMatch:'full' },
                  { path: 'netQuantity', component: ProductNetQuantityComponent , pathMatch:'full' },

                  //Categories
                  { path: 'root-category', component: RootCategoryComponent , pathMatch:'full' },
                  { path: 'sub-category', component: SubCategoryComponent , pathMatch:'full' },
                  { path: 'type-category', component: TypeCategoryComponent , pathMatch:'full' },
                  { path: 'variant-category', component: VariantCategoryComponent , pathMatch:'full' },

      ],
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
