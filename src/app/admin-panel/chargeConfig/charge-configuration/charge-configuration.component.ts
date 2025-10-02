import { Component } from '@angular/core';
import { RootCategoryService } from '../../../_services/categories/rootCategory/root-category.service';
import { BucketService } from '../../../_services/bucket/bucket.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { TypeCategoryService } from '../../../_services/categories/typeCategory/type-category.service';
import { VariantCategoryService } from '../../../_services/categories/variantCategory/variant-category.service';
import { ChargeConfigService } from '../../../_services/chargeConfig/chargeConfigService/charge-config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-charge-configuration',
  templateUrl: './charge-configuration.component.html',
  styleUrl: './charge-configuration.component.css',
})
export class ChargeConfigurationComponent {
  variantList: any;
  chargeConfigList: any;
  progressBarShow: any = false;
  parentList: any = '';

  //form Hide and show for update and save user
  viceVersaForm: boolean = false;


  form: any = {
    variantId: null,
    tcsCharge: null,
    tdsCharge: null,
    shippingCharge: null,
    shippingChargeFee: null,
    description: null,
    isActive: false,
  };

  constructor(
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private variantCategoryService: VariantCategoryService,
    private chargeConfigService:ChargeConfigService
  ) {}
  ngOnInit(): void {
    this.getVariantCategoryList();

    // CHARGE CONFIG LIST
    this.getChargeConfigList();
  }

  getVariantCategoryList() {
    this.spinner.show();
    this.variantCategoryService.getVariantCategoryListService().subscribe({
      next: (res: any) => {
        this.variantList = res.data;
        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err);
        this.spinner.hide();
        this.toast.error({
          detail: 'Error',
          summary: err.error.data.message,
          position: 'bottomRight',
          duration: 3000,
        });
      },
    });
  }


  // GET CHARGE CONFIG DATA
  getChargeConfigList() {
    this.spinner.show();
    this.chargeConfigService.getChargeConfigListService().subscribe({
      next: (res: any) => {
        console.log(res);
        
        this.chargeConfigList = res.data;
        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err);
        this.spinner.hide();
        this.toast.error({
          detail: 'Error',
          summary: err.error.data.message,
          position: 'bottomRight',
          duration: 3000,
        });
      },
    });
  }


    updateform: any = {
    id:0,
    variantId: null,
    tcsCharge: null,
    tdsCharge: null,
    shippingCharge: null,
    shippingChargeFee: null,
    description: null,
    isActive: false,
  };
    getChargeConfigById(chargeConfigId: any) {
    //to show update form
    this.viceVersaForm = true;
    this.chargeConfigService.getChargeByIdService(chargeConfigId).subscribe({
      next:(res:any)=> {
        this.updateform = res.data;
        console.log(res);
        console.log("UPDATE FORM");
        console.log(this.updateform);
        
        this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
        
      },
      error:(err:any)=>  {
        this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        this.spinner.hide();
        console.log(err);
          }
        }
      );
    }


  onSubmit() {
       this.chargeConfigService.saveChargeConfig(this.form).subscribe({
        next:(res:any)=> {
          this.toast.success({detail:"Success",summary:"Charge Config Saved Success", position:"bottomRight",duration:3000});
          this.spinner.hide();

          //Charge List
          this.getChargeConfigList();
        },
        error:(err:any)=>  {
          this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
          this.spinner.hide();
          console.log(err);
        }
      }
    );
}


updateChargeConfig()
{
       this.chargeConfigService.updateCharge(this.updateform).subscribe({
       next:(res:any)=> {
         this.toast.success({detail:"Success",summary:"Data Update Success", position:"bottomRight",duration:3000});
         
         //get Charge Config List
         this.getChargeConfigList();
         
         this.spinner.hide();
       },
       error:(err:any)=>  {
         this.toast.error({detail:"Error",summary:err, position:"bottomRight",duration:3000});
         this.spinner.hide();
         console.log(err);
           }
         }
       );
}



deleteCharge(chargeId:any){
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't to delete this",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {


              //save File
            this.chargeConfigService.deleteChargeService(chargeId).subscribe({
              next:(res:any)=> {
                this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
                
                //get Born Category List
                this.getChargeConfigList();
                
                this.spinner.hide();
              },
              error:(err:any)=>  {
                this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
                this.spinner.hide();
                console.log(err);
                  }
                }
              );
              
            }
          })
  }




}
