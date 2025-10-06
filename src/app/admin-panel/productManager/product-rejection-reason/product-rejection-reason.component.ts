import { Component, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductRejectReasonService } from '../../../_services/productManagerService/productRejectReasonService/product-reject-reason.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-rejection-reason',
  templateUrl: './product-rejection-reason.component.html',
  styleUrl: './product-rejection-reason.component.css'
})
export class ProductRejectionReasonComponent {

  //form Hide and show for update and save user
  viceVersaForm: boolean = false;
  progressBarShow: any = false;


    form: any = {
    code: null,
    category: null,
    reason: null,
    description: null,
    isActive: false,
  };


   updateform: any = {
    id:0,
    code: null,
    category: null,
    reason: null,
    description: null,
    isActive: false,
  };

  constructor(
      private toast: NgToastService,
      private spinner: NgxSpinnerService,
      private rejectionReasonService: ProductRejectReasonService
    ) {}


    ngOnInit() {
      this.getRejectedReasons();
    }




    
//Rejection Reason Data
  onSubmit() {
       this.rejectionReasonService.saveRejectionReason(this.form).subscribe({
        next:(res:any)=> {
          this.toast.success({detail:"Success",summary:"Rejection Reason Saved Success", position:"topRight",duration:2000});
          this.spinner.hide();

          //Rejection Reason Data
          this.getRejectedReasons();
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
updateRejectionReason()
{
       this.rejectionReasonService.updateRejectionReason(this.updateform).subscribe({
       next:(res:any)=> {
         this.toast.success({detail:"Success",summary:"Data Update Success", position:"topRight",duration:2000});
         
         //Rejection Reason Data
         this.getRejectedReasons();
         
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
    'code',
    'category',
    'description',
    'active',
    'update',
    'remove',
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getRejectedReasons() {
    this.rejectionReasonService.getRejectedReasonsService().subscribe({
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
    getRejectionReasonById(rejectionId: any) {
    this.viceVersaForm = true;
    this.rejectionReasonService.getRejectionReasonByIdSerive(rejectionId).subscribe({
      next:(res:any)=> {
        this.updateform = res.data;
        console.log(res);
        console.log("UPDATE FORM");
        console.log(this.updateform);
        
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
                this.rejectionReasonService.deleteRejectedReasonService(rejectionId).subscribe({
                  next:(res:any)=> {
                    this.toast.success({detail:"Success",summary:"Delete Success", position:"topRight",duration:2000});
                    
                    //get Born Category List
                    this.getRejectedReasons();
                    
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
