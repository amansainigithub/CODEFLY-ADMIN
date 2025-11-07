import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminGuardService } from './authGuards/adminGuards/admin-guard.service';
import { CustomerComponent } from './admin-panel/users/customer/customer.component';
import { AdminComponent } from './admin-panel/users/admin/admin.component';
import { SellerComponent } from './admin-panel/users/seller/seller.component';
import { HsnCodesComponent } from './admin-panel/Product-Matadata/hsn-codes/hsn-codes.component';
import { ProductBrandComponent } from './admin-panel/Product-Matadata/product-brand/product-brand.component';
import { ProductMaterialComponent } from './admin-panel/Product-Matadata/product-material/product-material.component';
import { ProductTypeComponent } from './admin-panel/Product-Matadata/product-type/product-type.component';
import { ProductSizeComponent } from './admin-panel/Product-Matadata/product-size/product-size.component';
import { ProductNetQuantityComponent } from './admin-panel/Product-Matadata/product-net-quantity/product-net-quantity.component';
import { RootCategoryComponent } from './admin-panel/categories/root-category/root-category.component';
import { SubCategoryComponent } from './admin-panel/categories/sub-category/sub-category.component';
import { TypeCategoryComponent } from './admin-panel/categories/type-category/type-category.component';
import { VariantCategoryComponent } from './admin-panel/categories/variant-category/variant-category.component';
import { ChargeConfigurationComponent } from './admin-panel/chargeConfig/charge-configuration/charge-configuration.component';
import { ProductApprovedComponent } from './admin-panel/product-stages/product-approved/product-approved.component';
import { ProductUnderReviewComponent } from './admin-panel/product-stages/product-under-review/product-under-review.component';
import { ProductReviewComponent } from './admin-panel/productManager/product-review/product-review.component';
import { ProductApproverComponent } from './admin-panel/productManager/product-approver/product-approver.component';
import { ProductRejectionReasonComponent } from './admin-panel/productManager/product-rejection-reason/product-rejection-reason.component';
import { AdminDashboardComponent } from './admin-panel/admin-dashboard/admin-dashboard.component';
import { ProductDisApprovedComponent } from './admin-panel/product-stages/product-dis-approved/product-dis-approved.component';
import { ProductDraftComponent } from './admin-panel/product-stages/product-draft/product-draft.component';
import { EmailTemplateComponent } from './admin-panel/emailBucket/email-template/email-template.component';
import { SendEmailAuditComponent } from './admin-panel/emailBucket/send-email-audit/send-email-audit.component';
import { ProductSearchManagementComponent } from './admin-panel/product-stages/product-search-management/product-search-management.component';
import { ProductRootRejectionCategoryComponent } from './admin-panel/productManager/product-root-rejection-category/product-root-rejection-category.component';

const routes: Routes = [
// { path: 'register', component: RegisterComponent },
{ path: '', component: LoginComponent },

{
  path: 'admin/dashboard',canActivate:[AdminGuardService] ,
      children: [
                  //ADMIN PANEL
                  { path: '', component: AdminDashboardComponent},
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

                  //CHARGE-CONFIG
                  { path: 'charge-config', component: ChargeConfigurationComponent , pathMatch:'full' },

                  //PRODUCT STAGES
                  { path: 'product-approved', component: ProductApprovedComponent , pathMatch:'full' },
                  { path: 'product-under-review', component: ProductUnderReviewComponent , pathMatch:'full' },
                  { path: 'product-dis-approved', component: ProductDisApprovedComponent , pathMatch:'full' },
                  { path: 'product-draft', component: ProductDraftComponent , pathMatch:'full' },

                  //REVIEW PRODUCT
                  { path: 'product-review', component: ProductReviewComponent , pathMatch:'full' },

                  //REVIEW APPROVER
                  { path: 'product-approver', component: ProductApproverComponent , pathMatch:'full' },

                  //REVIEW APPROVER
                  { path: 'product-Rejection-reason', component: ProductRejectionReasonComponent , pathMatch:'full' },
                  { path: 'root-rejection-category', component: ProductRootRejectionCategoryComponent , pathMatch:'full' },

                  //Email Template
                  { path: 'email-template', component: EmailTemplateComponent , pathMatch:'full' },
                  { path: 'send-email-audit', component: SendEmailAuditComponent , pathMatch:'full' },

                   //PRODUCT SEARCH MANAGEMENT
                  { path: 'product-Search-Management', component: ProductSearchManagementComponent , pathMatch:'full' },

      ],
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
