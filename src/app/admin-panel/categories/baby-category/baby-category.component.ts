import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParentCategoryService } from '../../../_services/categories/parentCategory/parent-category.service';
import { ChildCategoryService } from '../../../_services/categories/childCategory/child-category.service';
import { NgToastService } from 'ng-angular-popup';
import { BucketService } from '../../../_services/bucket/bucket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BabyCategoryService } from '../../../_services/categories/babyCategory/baby-category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-baby-category',
  templateUrl: './baby-category.component.html',
  styleUrl: './baby-category.component.css'
})
export class BabyCategoryComponent {

   //form Hide and show for update and save user
   viceVersaForm:boolean = false;

   progressBarShow:any = false;

   parentList: any[] = [];
   imageSrc: string = '';
   file:any;
   fileRendor:boolean = false;
   babyList:any;
   childList:any;
 
 
   form: any = {
     categoryName: null,
     defaultName: null,
     slug: null,
     description: null,
     metaDescription: null,
     featuredStatus: null,
     categoryFile: null,
     permalink: null,
     user: null,
     childCategoryId: null,
   };

   ngOnInit(): void { 

    // Child List
    this.getChildCategoryList();

    // Baby List
    this.getbabyCategoryList();
  }
  

  constructor(
    private router:Router, 
    private parentCategoryService:ParentCategoryService ,
    private childCategoryService:ChildCategoryService,
    private babyCategoryService:BabyCategoryService,
    private toast:NgToastService ,
    private bucket:BucketService,
    private spinner: NgxSpinnerService)
  {}


  getChildCategoryList()
  {
    this.spinner.show();
    this.childCategoryService.getChildCategoryListService().subscribe({
      next:(res:any)=> {
        this.childList = res.data;
        this.spinner.hide();
      },
      error:(err:any)=>  {
        console.log(err);
        this.spinner.hide();
        this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        
      }
    }
  );
  }

 



  getbabyCategoryList()
  {
    this.spinner.show();
    this.babyCategoryService.getBabyCategoryListService().subscribe({
      next:(res:any)=> {
        this.babyList = res.data;
        this.spinner.hide();
      },
      error:(err:any)=>  {
        console.log(err);
        this.spinner.hide();
        this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        
      }
    }
  );
  }

  deleteBabyCategoryByid(babyCategoryId:any)
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


        //save File
      this.babyCategoryService.deletebabyCategoryByIdService(babyCategoryId).subscribe({
        next:(res:any)=> {
          this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
          
          //get Parent Category List
          this.getbabyCategoryList();
          
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

  onChange(event:any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileRendor = true;
        this.imageSrc = reader.result as string;
      };
      this.file=event.target.files[0];
    }
  }



  onSubmit()
  {
    if(this.file == null)
      {
        this.toast.error({detail:"Error",summary:"please Select File", position:"bottomRight",duration:3000});
      }
      else{
            this.spinner.show();
            //upload File
            this.bucket.uploadFile(this.file).subscribe({
              next:(res:any)=> {
                this.form.categoryFile = res.bucketUrl;
                this.toast.success({detail:"Success",summary:"File Upload Success", position:"bottomRight",duration:3000});
                //save Parent data
                this.saveBabyCategory();
              },
              error:(err:any)=>  {
                this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
                console.log(err);
                return;
              }
            }
          );
       
        }
  }

  saveBabyCategory()
  {
    this.babyCategoryService.saveBabyCategoryService(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"Baby Saved Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

        //getBabyList
        this.getbabyCategoryList();
      },
      error:(err:any)=>  {
        this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        this.spinner.hide();
        console.log(err);
      }
    }
  );
  }




  
}
