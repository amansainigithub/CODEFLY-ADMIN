import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminDashboardComponent } from './admin-panel/admin-dashboard/admin-dashboard.component';
import { AdminGuardService } from './authGuards/adminGuards/admin-guard.service';
import { ParentCategoryComponent } from './admin-panel/categories/parent-category/parent-category.component';
import { ChildCategoryComponent } from './admin-panel/categories/child-category/child-category.component';
import { UpdateParentFileComponent } from './admin-panel/categories/parent-category/updateParentFile/update-parent-file/update-parent-file.component';
import { BabyCategoryComponent } from './admin-panel/categories/baby-category/baby-category.component';
import { BornCategoryComponent } from './admin-panel/categories/born-category/born-category.component';
import { CustomerComponent } from './admin-panel/users/customer/customer.component';
import { AdminComponent } from './admin-panel/users/admin/admin.component';
import { SellerComponent } from './admin-panel/users/seller/seller.component';

const routes: Routes = [
// { path: 'register', component: RegisterComponent },
{ path: '', component: LoginComponent },

{
  path: 'admin/dashboard',canActivate:[AdminGuardService] ,
      children: [
                  //ADMIN PANEL
                  // { path: '', component: AdminDashboardComponent},
                  { path: 'profile', component: ProfileComponent },
                  { path: 'parent-category', component: ParentCategoryComponent , pathMatch:'full' },
                  { path: 'child-category', component: ChildCategoryComponent , pathMatch:'full' ,  },
                  { path: 'update-parent-file', component: UpdateParentFileComponent , pathMatch:'full' },
                  { path: 'baby-category', component: BabyCategoryComponent , pathMatch:'full' },
                  { path: 'born-category', component: BornCategoryComponent , pathMatch:'full' },
                  { path: 'customer-node', component: CustomerComponent , pathMatch:'full' },
                  { path: 'seller-node', component: SellerComponent , pathMatch:'full' },
                  { path: 'admin-node', component: AdminComponent , pathMatch:'full' },
      ],
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
