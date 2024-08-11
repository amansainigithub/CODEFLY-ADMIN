import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { ParentCategoryService } from '../../../_services/categories/parentCategory/parent-category.service';
import { ChildCategoryService } from '../../../_services/categories/childCategory/child-category.service';

@Component({
  selector: 'app-child-category',
  templateUrl: './child-category.component.html',
  styleUrl: './child-category.component.css'
})
export class ChildCategoryComponent {

  progressBarShow:any = false;

  parentList: any[] = [];

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
    private spinner: NgxSpinnerService)
  {}

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
    console.log(JSON.stringify(this.form))
    this.spinner.show();
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
