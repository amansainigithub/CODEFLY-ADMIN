import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { BucketService } from '../../../_services/bucket/bucket.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UpdateSubFileComponent } from './update-sub-file/update-sub-file.component';
import { SubCategoryService } from '../../../_services/categories/subCategory/sub-category.service';
import { RootCategoryService } from '../../../_services/categories/rootCategory/root-category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css'
})
export class SubCategoryComponent {

   //form Hide and show for update and save user
  viceVersaForm:boolean = false;

  progressBarShow:any = false;

  rootList: any[] = [];
  imageSrc: string = '';
  file:any;
  fileRendor:boolean = false;
  subList:any;


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
    rootCategoryId: null,
  };


  ngOnInit(): void { 
    // Root List
    this.getRootCategoryList();

    // Sub Category List
    this.getSubCategoryList();
  }
  

  constructor(
    private rootCategoryService:RootCategoryService ,
    private subCategoryService:SubCategoryService,
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
        this.fileRendor = true;
        this.imageSrc = reader.result as string;
      };
      this.file=event.target.files[0];
    }
  }


  getRootCategoryList()
  {
      this.spinner.show();
      this.rootCategoryService.getRootListService().subscribe({
        next:(res:any)=> {
          this.rootList = res.data;
          // console.log(this.rootList);
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
                
                //save Sub Category data
                this.saveSubCategory();
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

  saveSubCategory()
  {
    this.subCategoryService.saveSubCategoryService(this.form).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"sub-category Saved Success", position:"bottomRight",duration:3000});
        this.spinner.hide();

        //get Sub category list
        this.getSubCategoryList();
      },
      error:(err:any)=>  {
        this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
        this.spinner.hide();
        console.log(err);
      }
    }
  );
  }

displayedColumns: string[] = [
      'id',
      'categoryName',
      'categoryFile',
      'active',
      'update',
      'remove',
    ];

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getSubCategoryList()
  {
    this.spinner.show();
    this.subCategoryService.getSubCategoryDataService().subscribe({
      next:(res:any)=> {
        this.subList = res.data;

        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;  // ✅ client-side pagination
        this.dataSource.sort = this.sort;            // ✅ sorting

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

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // filter ke baad page reset
    }
  }
 

  deleteSubCategoryByid(parentCategoryId:any)
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
      this.subCategoryService.deleteSubCategoryByIdService(parentCategoryId).subscribe({
        next:(res:any)=> {
          this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
          
          //get Parent Category List
          this.getSubCategoryList();
          
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

  updateform: any = {
    id: 0,
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


  getSubCategoryById(subCategoryId: any) {
    //to show update form
    this.viceVersaForm = true;

    this.subCategoryService.getSubCategoryByIdService(subCategoryId).subscribe({
      next:(res:any)=> {
        this.updateform = res.data;
        this.fileRendor = false;
        console.log(res);

        //this.getParentCategoryList();

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

    updateSubCategory()
    {
      console.log(this.updateform);
       //save File
       this.subCategoryService.updateSubCategory(this.updateform).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"data Update Success", position:"bottomRight",duration:3000});
           
           //get sub Category List
           this.getSubCategoryList();
           
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



    readonly dialog = inject(MatDialog);
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string,subCategoryId:any): void {
      const dialogRef = this.dialog.open(UpdateSubFileComponent, {
        width: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { subCategoryId: subCategoryId },
        
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog result: " + result);
        this.getSubCategoryList();
      });
      
    }


  addNew(){
    this.viceVersaForm = false;
  }
}
