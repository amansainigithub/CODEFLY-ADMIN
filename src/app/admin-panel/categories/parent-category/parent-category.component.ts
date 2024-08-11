import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParentCategoryService } from '../../../_services/categories/parentCategory/parent-category.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { BucketService } from '../../../_services/bucket/bucket.service';

@Component({
  selector: 'app-parent-category',
  templateUrl: './parent-category.component.html',
  styleUrl: './parent-category.component.css'
})
export class ParentCategoryComponent {
  
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
    isActive: false,
  };
 
  progressBarShow:any = false;
  imageSrc: string = '';
  file:any;

  constructor(
    private router:Router, 
    private parentCategoryService:ParentCategoryService ,
    private bucket:BucketService,
    private toast:NgToastService ,
    private spinner: NgxSpinnerService)
  {}



  onChange(event:any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      this.file=event.target.files[0];
    }

    console.log(this.file);

    this.bucket.uploadFile(this.file).subscribe({
      next:(res:any)=> {
        console.log(res.bucketUrl);
        this.toast.success({detail:"Success",summary:"File Saved Success", position:"bottomRight",duration:3000});
        
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



  onSubmit()
  {
    this.spinner.show();
      this.parentCategoryService.saveParentCategory(this.form).subscribe({
        next:(res:any)=> {
          this.toast.success({detail:"Success",summary:"data Saved Success", position:"bottomRight",duration:3000});
          
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






}
