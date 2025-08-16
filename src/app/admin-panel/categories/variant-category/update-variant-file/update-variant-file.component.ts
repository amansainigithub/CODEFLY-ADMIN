import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { VariantCategoryService } from '../../../../_services/categories/variantCategory/variant-category.service';;

@Component({
  selector: 'app-update-variant-file',
  templateUrl: './update-variant-file.component.html',
  styleUrl: './update-variant-file.component.css'
})
export class UpdateVariantFileComponent {


  
    imageSrc: string = '';
    file:any;
    id:any;
    category:any;
  
  
    constructor( 
      @Inject(MAT_DIALOG_DATA) public data: any ,
      private toast:NgToastService ,
      private variantCategoryService:VariantCategoryService,
      private dialogRef: MatDialogRef<UpdateVariantFileComponent>) { }
    
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
  
          console.log(this.file);
  
          if(this.file == null)
          {
           this.toast.error({detail:"Error",summary:"Error : File is Empty", position:"bottomRight",duration:3000});
          }
          else{
            this.variantCategoryService.updateVariantFile(this.file,this.data.variantCategoryId).subscribe({
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
