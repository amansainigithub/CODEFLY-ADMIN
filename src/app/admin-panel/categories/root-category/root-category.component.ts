import { Component, inject, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { BucketService } from '../../../_services/bucket/bucket.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { RootCategoryService } from '../../../_services/categories/rootCategory/root-category.service';
import { UpdateRootFileComponent } from './update-root-file/update-root-file.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-root-category',
  templateUrl: './root-category.component.html',
  styleUrl: './root-category.component.css'
})
export class RootCategoryComponent {

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
  parentList:any = "";

  //form Hide and show for update and save user
  viceVersaForm:boolean = false;

  //To show to image
  fileRendor:boolean = false;
  imageSrc: string = '';
  file:any;

  constructor(
    private rootCategoryService:RootCategoryService ,
    private bucket:BucketService,
    private toast:NgToastService ,
    private spinner: NgxSpinnerService
  )
  {}

  ngOnInit(): void { 
    this.getRootCategoryData();
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
  getRootCategoryData()
  {
    this.spinner.show();
    this.rootCategoryService.getRootListService().subscribe({
      next:(res:any)=> {
        this.parentList = res.data;

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
    }else{

      //show Spinner
      this.spinner.show();

      //upload File
      this.bucket.uploadFile(this.file).subscribe({
        next:(res:any)=> {
          this.form.categoryFile = res.bucketUrl;
          this.toast.success({detail:"Success",summary:"File Upload Success", position:"bottomRight",duration:1000});
          //Save Root Category
          this.saveRootCategory();

          console.log(res);
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


    saveRootCategory()
    {
       //save File
       this.rootCategoryService.saveRootCategory(this.form).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"data Saved Success", position:"bottomRight",duration:3000});
           
           //get Parent Category List
           this.getRootCategoryData();
           
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

    deleteRootCategory(parentCategoryId:any)
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
        this.rootCategoryService.deleteRootCategoryService(parentCategoryId).subscribe({
          next:(res:any)=> {
            this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
            
            //get Parent Category List
            this.getRootCategoryData();
            
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
   

    parentdata:any;
    getRootCategoryById(parentCategoryId:any)
    {
      //to show update form
      this.viceVersaForm = true;

      this.rootCategoryService.getRootCategoryByIdService(parentCategoryId).subscribe({
        next:(res:any)=> {
          this.updateform = res.data;
          this.fileRendor = false;
          console.log(res)
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


    updateRootCategory()
    {
      console.log(this.updateform);
       //save File
       this.rootCategoryService.updateRootCategory(this.updateform).subscribe({
         next:(res:any)=> {
           this.toast.success({detail:"Success",summary:"data Update Success", position:"bottomRight",duration:3000});
           
           //get Parent Category List
           this.getRootCategoryData();
           
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
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string,rootCategoryId:any): void {
      const dialogRef = this.dialog.open(UpdateRootFileComponent, {
        width: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { rootCategoryId: rootCategoryId },
        
      });

      dialogRef.afterClosed().subscribe(result => {
        // console.log("Dialog result: " + result);
        this.getRootCategoryData();
      });
    }

}
