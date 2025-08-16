import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { TypeCategoryService } from '../../../../_services/categories/typeCategory/type-category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-type-file',
  templateUrl: './update-type-file.component.html',
  styleUrl: './update-type-file.component.css'
})
export class UpdateTypeFileComponent {

  imageSrc: string = '';
  file:any;
  id:any;
  category:any;

  constructor( 
  @Inject(MAT_DIALOG_DATA) public data: any ,
  private toast:NgToastService ,
  private typeCategoryService:TypeCategoryService,
  private dialogRef: MatDialogRef<UpdateTypeFileComponent>) { }

    ngOnInit(): void {
     }

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


    //UPDATE FILE CATEGORY
    updateCategoryFile(){
      if(this.file == null)
      {
       this.toast.error({detail:"Error",summary:"Error : File is Empty", position:"bottomRight",duration:3000});
      }
      else{
        this.typeCategoryService.updateTypeFile(this.file,this.data.typeCategoryId).subscribe({
          next:(res:any)=>{
            this.toast.success({detail:"Success",summary:"File Update success", position:"bottomRight",duration:3000});
            this.dialogRef.close();

          },error:(err:any)=>{
            console.log(err.roor.message);
          }
        })
      }
    }
}
