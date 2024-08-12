import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ParentCategoryService } from '../../../_services/categories/parentCategory/parent-category.service';
import { ChildCategoryService } from '../../../_services/categories/childCategory/child-category.service';
import { BucketService } from '../../../_services/bucket/bucket.service';

@Component({
  selector: 'app-child-category',
  templateUrl: './child-category.component.html',
  styleUrl: './child-category.component.css'
})
export class ChildCategoryComponent {

  progressBarShow:any = false;

  parentList: any[] = [];
  imageSrc: string = '';
  file:any;

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
    parentCategoryId: null,
  };


  ngOnInit(): void { 
    this.getParentCategoryList();
  }
  

  constructor(
    private router:Router, 
    private parentCategoryService:ParentCategoryService ,
    private childCategoryService:ChildCategoryService,
    private toast:NgToastService ,
    private bucket:BucketService,
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
  }


  getParentCategoryList()
  {
    this.spinner.show();
    this.parentCategoryService.getParentCategoryListService().subscribe({
      next:(res:any)=> {
        this.parentList = res.data;
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
                this.saveChildCategory();
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

  saveChildCategory()
  {
    this.childCategoryService.saveChildCategoryService(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"child Saved Success", position:"bottomRight",duration:3000});
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
