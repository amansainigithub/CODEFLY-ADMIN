import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    featuredFile: null,
    categoryFile: null,
    permalink: null,
    user: null,
    isActive: false,
  };

 

  progressBarShow:any = false;

  constructor(private router:Router)
  {

  }

  onSubmit()
  {
      console.log(JSON.stringify(this.form));
  }






}
