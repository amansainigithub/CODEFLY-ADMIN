import { Component, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductRejectReasonService } from '../../../_services/productManagerService/productRejectReasonService/product-reject-reason.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { RootRejectionCategoryService } from '../../../_services/productManagerService/productRejectReasonService/rootRejectionCategoryService/root-rejection-category.service';
@Component({
  selector: 'app-product-root-rejection-category',
  templateUrl: './product-root-rejection-category.component.html',
  styleUrl: './product-root-rejection-category.component.css'
})
export class ProductRootRejectionCategoryComponent {

  //form Hide and show for update and save user
  viceVersaForm: boolean = false;
  progressBarShow: any = false;


    form: any = {
    rootRejectionCategory: null,
    description: null,
    isActive: false,
  };


   updateform: any = {
    id:0,
    rootRejectionCategory: null,
    description: null,
    isActive: false,
  };

  constructor(
      private toast: NgToastService,
      private spinner: NgxSpinnerService,
      private rootRejectionCategoryService: RootRejectionCategoryService
    ) {}


    ngOnInit() {
      this.getRootRejectionCategory();
    }




    
//Rejection Reason Data
  onSubmit() {
       this.rootRejectionCategoryService.saveRootRejectionCategory(this.form).subscribe({
        next:(res:any)=> {
          this.toast.success({detail:"Success",summary:"Root Rejection Category Saved Success", position:"topRight",duration:2000});
          this.spinner.hide();

          //Rejection Reason Data
          this.getRootRejectionCategory();
        },
        error:(err:any)=>  {
          this.toast.error({detail:"Error",summary:err.error.data.message, position:"topRight",duration:2000});
          this.spinner.hide();
          console.log(err);
        }
      }
    );
}



//UPDATE REJECTION REASON
updateRootRejectionCategory()
{
       this.rootRejectionCategoryService.updateRootRejectionCategory(this.updateform).subscribe({
       next:(res:any)=> {
         this.toast.success({detail:"Success",summary:"Data Update Success", position:"topRight",duration:2000});
         
         //Rejection Reason Data
         this.getRootRejectionCategory();
         
         this.spinner.hide();
       },
       error:(err:any)=>  {
         this.toast.error({detail:"Error",summary:err, position:"topRight",duration:2000});
         this.spinner.hide();
         console.log(err);
           }
         }
       );
}


    
  displayedColumns: string[] = [
    'id',
    'rootRejectionCategory',
    'description',
    'active',
    'update',
    'remove',
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getRootRejectionCategory() {
    this.rootRejectionCategoryService.getRootRejectionCategory().subscribe({
      next: (res: any) => {
        console.log(res);
        
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;  //  client-side pagination
        this.dataSource.sort = this.sort;            //  sorting
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // filter ke baad page reset
    }
  }



    //Rejection Reason BY ID
    getRootRejectionCategoryById(rejectionId: any) {
    this.viceVersaForm = true;
    this.rootRejectionCategoryService.getRootCategoryRejectionById(rejectionId).subscribe({
      next:(res:any)=> {
        this.updateform = res.data;
        this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"topRight",duration:2000});
      },
      error:(err:any)=>  {
        this.toast.error({detail:"Error",summary:err.error.data.message, position:"topRight",duration:2000});
        this.spinner.hide();
        console.log(err);
          }
        }
      );
    }



        
    deleteRejectionReason(rejectionId:any){
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
                this.rootRejectionCategoryService.deleteRootRejectionCategory(rejectionId).subscribe({
                  next:(res:any)=> {
                    this.toast.success({detail:"Success",summary:"Delete Success", position:"topRight",duration:2000});
                    
                    this.viceVersaForm = false;

                    //get Root Rejection Category
                    this.getRootRejectionCategory();
                    
                    this.spinner.hide();
                  },
                  error:(err:any)=>  {
                    this.toast.error({detail:"Error",summary:err.error.data.message, position:"topRight",duration:2000});
                    this.spinner.hide();
                    console.log(err);
                      }
                    }
                  );
                  
                }
              })
      }


      
  addNew(){
    this.viceVersaForm = false;
  }
  
}
