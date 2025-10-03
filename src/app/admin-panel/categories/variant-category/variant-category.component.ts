import { Component, inject, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BucketService } from '../../../_services/bucket/bucket.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UpdateVariantFileComponent } from './update-variant-file/update-variant-file.component';
import { TypeCategoryService } from '../../../_services/categories/typeCategory/type-category.service';
import { VariantCategoryService } from '../../../_services/categories/variantCategory/variant-category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-variant-category',
  templateUrl: './variant-category.component.html',
  styleUrl: './variant-category.component.css'
})
export class VariantCategoryComponent {

  //form Hide and show for update and save user
  viceVersaForm:boolean = false;

  progressBarShow:any = false;

  parentList: any[] = [];
  imageSrc: string = '';
  file:any;
  fileRendor:boolean = false;
  variantList:any;
  typeList:any;


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
    typeCategoryId: null,
  };

  ngOnInit(): void { 

    this.getTypeCategoryList();

    this.getVariantCategoryList();
  }

  constructor(
    private typeCategoryService:TypeCategoryService,
    private variantCategoryService:VariantCategoryService,
    private toast:NgToastService ,
    private bucket:BucketService,
    private spinner: NgxSpinnerService)
  {}


  getTypeCategoryList()
  {
    this.spinner.show();
    this.typeCategoryService.getTypeCategoryDataService().subscribe({
      next:(res:any)=> {
        this.typeList = res.data;
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
 getVariantCategoryList(){
              this.spinner.show();
              this.variantCategoryService.getVariantCategoryListService().subscribe({
                next:(res:any)=> {
                this.variantList = res.data;

                this.dataSource = new MatTableDataSource(res.data);
                this.dataSource.paginator = this.paginator;  // ✅ client-side pagination
                this.dataSource.sort = this.sort;      

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


  deleteVariantCategoryByid(bornCategoryId:any){
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
            this.variantCategoryService.deleteVariantCategoryByIdService(bornCategoryId).subscribe({
              next:(res:any)=> {
                this.toast.success({detail:"Success",summary:"Delete Success", position:"bottomRight",duration:3000});
                
                //get Born Category List
                this.getVariantCategoryList();
                
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
                
                this.saveVariantCategory();
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

  //Save Data Born
  saveVariantCategory()
  {
      this.variantCategoryService.saveVariantCategoryService(this.form).subscribe({
        next:(res:any)=> {
          this.toast.success({detail:"Success",summary:"Variant Saved Success", position:"bottomRight",duration:3000});
          this.spinner.hide();

          //getBornList
          this.getVariantCategoryList();
        },
        error:(err:any)=>  {
          this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});
          this.spinner.hide();
          console.log(err);
        }
      }
    );
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


  
  updateVariantCategory()
  {
    console.log(this.updateform);
     //save File
    const data ={id:"100",productName:"AMan saini"}
     this.variantCategoryService.updateVariantCategoryNew(data).subscribe({
      next:(res:any)=> {
        this.toast.success({detail:"Success",summary:"data Update Success", position:"bottomRight",duration:3000});
        this.spinner.hide();
      },
      error:(err:any)=>  {
        this.toast.error({detail:"Error",summary:err, position:"bottomRight",duration:3000});
        this.spinner.hide();
        console.log(err);
          }
        }
      );


     this.variantCategoryService.updateVariantCategory(this.updateform).subscribe({
       next:(res:any)=> {
         this.toast.success({detail:"Success",summary:"data Update Success", position:"bottomRight",duration:3000});
         
         //get Child Category List
         this.getVariantCategoryList();
         
         this.spinner.hide();
       },
       error:(err:any)=>  {
         this.toast.error({detail:"Error",summary:err, position:"bottomRight",duration:3000});
         this.spinner.hide();
         console.log(err);
           }
         }
       );
  }

  getVariantCategoryById(bornCategoryid: any) {
    //to show update form
    this.viceVersaForm = true;
    bornCategoryid
    this.variantCategoryService.getVariantCategoryByIdService(bornCategoryid).subscribe({
      next:(res:any)=> {
        this.updateform = res.data;
        this.fileRendor = false;
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


     //Update File
     readonly dialog = inject(MatDialog);
     openDialog(enterAnimationDuration: string, exitAnimationDuration: string,variantCategoryId:any): void {
       const dialogRef = this.dialog.open(UpdateVariantFileComponent, {
         width: '400px',
         enterAnimationDuration,
         exitAnimationDuration,
         data: { variantCategoryId: variantCategoryId },
         
       });
 
       dialogRef.afterClosed().subscribe(result => {
         console.log("Dialog result: " + result);
         this.getVariantCategoryList();
       });
       
     }




}
