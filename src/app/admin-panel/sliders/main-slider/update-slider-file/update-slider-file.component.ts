import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { UpdateSubFileComponent } from '../../../categories/sub-category/update-sub-file/update-sub-file.component';
import { MainSliderService } from '../../../../_services/slidersService/mainSliderService/main-slider.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-update-slider-file',
  templateUrl: './update-slider-file.component.html',
  styleUrl: './update-slider-file.component.css'
})
export class UpdateSliderFileComponent {

  imageSrc: string = '';
    file:any;
    id:any;
    category:any;
  
    constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private toast:NgToastService ,
    private spinner: NgxSpinnerService,
    private mainSliderService:MainSliderService,
    private dialogRef: MatDialogRef<UpdateSubFileComponent>) { }
  
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
      updateSliderFile(){
        if(this.file == null)
        {
         this.toast.error({detail:"Error",summary:"Error : File is Empty", position:"topRight",duration:2000});
        }
        else{
          this.spinner.show();
          this.mainSliderService.updateSliderFile(this.file,this.data.subCategoryId).subscribe({
            next:(res:any)=>{
              this.toast.success({detail:"Success",summary:"File Update success", position:"topRight",duration:2000});
              this.dialogRef.close();
              this.spinner.hide();
            },error:(err:any)=>{
              console.log(err.roor.message);
              this.spinner.hide();
            }
          })
        }
      }

}
