import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParentCategoryService } from '../../../_services/categories/parentCategory/parent-category.service';

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

  constructor(private router:Router, private parentCategoryService:ParentCategoryService)
  {

  }

  onSubmit()
  {
      console.log(JSON.stringify(this.form));

      this.parentCategoryService.saveParentCategory(this.form).subscribe({
        next:(res:any)=> {
          alert("data saved")
          console.log(res);
        },
        error:(err:any)=>  {
          console.log(err)
        }
      }
    );
  }






}
