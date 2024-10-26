import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { BucketService } from '../../../_services/bucket/bucket.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { CatalogTypeService } from '../../../_services/catalogMetaDataServices/typeService/catalog-type.service';

@Component({
  selector: 'app-catalog-type',
  templateUrl: './catalog-type.component.html',
  styleUrl: './catalog-type.component.css'
})
export class CatalogTypeComponent {

  
  //Filter List For Searching
  filteredItems:any = [];

   //form Hide and show for update and save user
   viceVersaForm:boolean = false;

  typeList:any[]=[];
  
  totalElements: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  //SearchList
  searchText: string = '';

  form: any = {
    catalogType: null,
    defaultName: null,
    description: null,
  };

  updateform: any = {
    catalogType: null,
   defaultName: null,
   description: null,
   isActive: false,
 };

 
   ngOnInit(): void { 
     this.getTypeByPagination({ page: "0", size: "10" });
 
   }
   
   constructor(
              private router:Router, 
              private typeService:CatalogTypeService,
              private toast:NgToastService ,
              private bucket:BucketService,
              private spinner: NgxSpinnerService)
            {}
 
 
  
 //GET TYPE PAGINATION START
   getTypeByPagination(request:any)
  {
    this.spinner.show();
    this.typeService.getTypeByPagination(request)
    .subscribe(
      {
          next:(res:any)=> {
          this.typeList = res.data['content']
          this.filteredItems  = this.typeList;

          this.totalElements = res.data['totalElements'];
          this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
          this.spinner.hide();
        },
        error:(err:any)=>  {
          console.log(err)
          this.spinner.hide();
          this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});

        }
      }
    );
  }
  //GET TYPE PAGINATION ENDING

  nextPage(event: PageEvent) {
    console.log(event);
    const request:any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getTypeByPagination(request);
}

 //SAVE TYPE START
   saveType()
   {
    console.log(this.form);
    this.typeService.saveTypeService(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"Type Saved Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

         //get TYPE Code Category List
         this.getTypeByPagination({ page: "0", size: "10" });
      },
      error:(err:any)=>  {
        //this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        this.toast.error({detail:"Error",summary:"Data Not Saved", position:"bottomRight",duration:3000});

        this.spinner.hide();
        console.log(err);
      }
    }
  );
   }
   //SAVE TYPE ENDING
 
  
 //Delete TYPE START
 deleteTypeByid(typeId:any)
   { 
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
 
 
         //Delete TYPE
       this.typeService.deleteTypeByIdService(typeId).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
           
           //get TYPE List
           this.getTypeByPagination({ page: "0", size: "10" });
           
           this.updateform = {};

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
   //DELETE TYPE END
 
  
   //Get TYPE By Id Start
   getTypeById(typeId: any) {
     //to show update form
     this.viceVersaForm = true;
 
     this.typeService.getTypeByIdService(typeId).subscribe({
       next:(res:any)=> {
         this.updateform = res.data;
         console.log(res);
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
   //Get TYPE By Id Ending
     
     //Update TYPE Start
updateType()
     {
       console.log(this.updateform);
        //save File
        this.typeService.updateType(this.updateform).subscribe({
          next:(res:any)=> {
            this.toast.success({detail:"Success",summary:"Data Update Success", position:"bottomRight",duration:3000});
            
            //get TYPE Category List
           this.getTypeByPagination({ page: "0", size: "10" });
            
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
 //Update TYPE Ending

     
   //Search Starting
     onSearch() {
      const searchQuery = this.searchText.trim().toLowerCase();
  
      if (searchQuery) {
        this.filteredItems = this.typeList.filter(item => 
          item.catalogType.toLowerCase().includes(searchQuery)
        );
      } else {
        this.filteredItems = this.typeList;
      }
    }
  //Search Ending
 

}
