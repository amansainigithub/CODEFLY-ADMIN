import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BucketService } from '../../../_services/bucket/bucket.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UpdateSubFileComponent } from '../../categories/sub-category/update-sub-file/update-sub-file.component';
import { MainSliderService } from '../../../_services/slidersService/mainSliderService/main-slider.service';
import { UpdateSliderFileComponent } from './update-slider-file/update-slider-file.component';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css'
})
export class MainSliderComponent {
  //form Hide and show for update and save user
    viceVersaForm: boolean = false;
  
    progressBarShow: any = false;
  
    rootList: any[] = [];
    imageSrc: string = '';
    file: any;
    fileRendor: boolean = false;
    subList: any;
  
    form: any = {
      sliderCategory: null,
      title: null,
      subTitle: null,
      description: null,
      fileUrl: null,
      routingLink: null,
      user: null,
    };
  
    displayedColumns: string[] = [
      'id',
      'sliderCategory',
      'fileUrl',
      'active',
      'update',
      'remove',
    ];
  
    dataSource = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    updateform: any = {
      id: 0,
      sliderCategory: null,
      title: null,
      subTitle: null,
      description: null,
      fileUrl: null,
      routingLink: null,
      user: null,
      isActive: false,
    };
  
    ngOnInit(): void {
      // Get Sliders
      this.getSliderList();
    }
  
    constructor(
      private toast: NgToastService,
      private bucket: BucketService,
      private spinner: NgxSpinnerService,
      private mainSliderService: MainSliderService
    ) {}
  
    onChange(event: any) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.fileRendor = true;
          this.imageSrc = reader.result as string;
        };
        this.file = event.target.files[0];
      }
    }
  
    onSubmit() {
      if (this.file == null) {
        this.toast.error({
          detail: 'Error',
          summary: 'please Select File',
          position: 'bottomRight',
          duration: 3000,
        });
      } else {
        this.spinner.show();
        //upload File
        this.bucket.uploadFile(this.file).subscribe({
          next: (res: any) => {
            this.form.fileUrl = res.bucketUrl;
            this.toast.success({
              detail: 'Success',
              summary: 'File Upload Success',
              position: 'topRight',
              duration: 2000,
            });
  
            //save Slider Category data
            this.saveSubCategory();
          },
          error: (err: any) => {
            this.toast.error({
              detail: 'Error',
              summary: err.error.data.message,
              position: 'topRight',
              duration: 2000,
            });
            console.log(err);
            return;
          },
        });
      }
    }
  
    saveSubCategory() {
      this.mainSliderService.saveMainSliderService(this.form).subscribe({
        next: (res: any) => {
          this.toast.success({
            detail: 'Success',
            summary: 'sub-category Saved Success',
            position: 'topRight',
            duration: 2000,
          });
          this.spinner.hide();
  
          // Get Sliders
          this.getSliderList();
        },
        error: (err: any) => {
          this.toast.error({
            detail: 'Error',
            summary: err.error.data.message,
            position: 'topRight',
            duration: 2000,
          });
          this.spinner.hide();
          console.log(err);
        },
      });
    }
  
    getSliderList() {
      this.spinner.show();
      this.mainSliderService.getSliderDataService().subscribe({
        next: (res: any) => {
          this.subList = res.data;
  
          this.dataSource = new MatTableDataSource(res.data);
          this.dataSource.paginator = this.paginator; // ✅ client-side pagination
          this.dataSource.sort = this.sort; // ✅ sorting
  
          this.spinner.hide();
        },
        error: (err: any) => {
          console.log(err);
          this.spinner.hide();
          this.toast.error({
            detail: 'Error',
            summary: err.error.data.message,
            position: 'topRight',
            duration: 2000,
          });
        },
      });
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage(); // filter ke baad page reset
      }
    }
  
    deleteSliderById(sliderId: any) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't to delete this",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          //save File
          this.mainSliderService
            .deleteSliderById(sliderId)
            .subscribe({
              next: (res: any) => {
                this.toast.success({
                  detail: 'Success',
                  summary: 'Delete Success',
                  position: 'topRight',
                  duration: 2000,
                });
  
                // Get Sliders
                this.getSliderList();
  
                this.spinner.hide();
              },
              error: (err: any) => {
                this.toast.error({
                  detail: 'Error',
                  summary: err.error.data.message,
                  position: 'topRight',
                  duration: 2000,
                });
                this.spinner.hide();
                console.log(err);
              },
            });
        }
      });
    }
  
    getSliderById(sliderId: any) {
      //to show update form
      this.viceVersaForm = true;
  
      this.mainSliderService.getSliderByIdService(sliderId).subscribe({
        next: (res: any) => {
          this.updateform = res.data;
          this.fileRendor = false;
          console.log(res);

          this.toast.success({
            detail: 'Success',
            summary: 'Data Fetch Success',
            position: 'topRight',
            duration: 2000,
          });
        },
        error: (err: any) => {
          this.toast.error({
            detail: 'Error',
            summary: err.error.data.message,
            position: 'topRight',
            duration: 2000,
          });
          this.spinner.hide();
          console.log(err);
        },
      });
    }
  
    updateSlider() {
      console.log(this.updateform);
      //save File
      this.mainSliderService.updateSlider(this.updateform).subscribe({
        next: (res: any) => {
          this.toast.success({
            detail: 'Success',
            summary: 'data Update Success',
            position: 'topRight',
            duration: 2000,
          });
  
          // Get Sliders
          this.getSliderList();
  
          this.spinner.hide();
        },
        error: (err: any) => {
          this.toast.error({
            detail: 'Error',
            summary: err.error.data.message,
            position: 'topRight',
            duration: 2000,
          });
          this.spinner.hide();
          console.log(err);
        },
      });
    }
  
    readonly dialog = inject(MatDialog);
    openDialog(
      enterAnimationDuration: string,
      exitAnimationDuration: string,
      subCategoryId: any
    ): void {
      const dialogRef = this.dialog.open(UpdateSliderFileComponent, {
        width: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { subCategoryId: subCategoryId },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        console.log('Dialog result: ' + result);

        // Get Sliders
        this.getSliderList();
      });
    }
  
    addNew() {
      this.viceVersaForm = false;
    }


    refreshData()
    {
      this.getSliderList();
    }

}
