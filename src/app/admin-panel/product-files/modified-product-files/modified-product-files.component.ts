import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { ProductDetailsService } from '../../../_services/productUploadService/productDetails/product-details.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgToastService } from 'ng-angular-popup';
import { ProductFilesService } from '../../../_services/productFiles/productFilesService/product-files.service';

declare var bootstrap: any; // Declare bootstrap for accessing modal methods

@Component({
  selector: 'app-modified-product-files',
  templateUrl: './modified-product-files.component.html',
  styleUrl: './modified-product-files.component.css'
})
export class ModifiedProductFilesComponent {
  productId: any;
  progressBar: boolean = false;
  productUploadStatus: boolean = false;

  imageSlots: (string | ArrayBuffer | null)[] = [null, null, null, null, null];
  files: (File | null)[] = [null, null, null, null, null];
  imageIds: (string | null)[] = [null, null, null, null, null]; // existing backend image IDs

  videoUrl: string | null = null;
  videoFile: File | null = null;
  videoId: string | null = null;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: NgToastService,
    private productFilesService: ProductFilesService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { productId: any };

    if (state && state.productId) {
      this.productId = state.productId;
      this.getProductFilesById(this.productId);
    } else {
      alert('No Product ID provided. Redirecting to Dashboard.');
      this.router.navigateByUrl('/seller/dashboard/home');
    }
  }

  // 🟢 Fetch product files from backend and prefill
  getProductFilesById(productId: any) {
    this.productFilesService.getProductFilesByIdService(productId).subscribe({
      next: (res: any) => {
        console.log('Product Files Response:', res);
        this.prefillFilesFromApi(res);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }



  // 🟢 Prefill images & video from API
  prefillFilesFromApi(apiResponse: any) {
    if (!apiResponse?.data) return;
    const filesData = apiResponse.data;

    const images = filesData.filter((f: any) => f.fileType === 'IMAGE');
    const videos = filesData.filter((f: any) => f.fileType === 'VIDEO');

    // Prefill images
    images.forEach((img: any, index: number) => {
      this.imageSlots[index] = img.fileUrl;
      this.imageIds[index] = img.id; // store existing image ID
      this.files[index] = null; // not uploading again until replaced
    });

    // Prefill video
    if (videos.length > 0) {
      const video = videos[0];
      this.videoUrl = video.fileUrl;
      this.videoId = video.id; // store existing video ID
      this.videoFile = null; // not uploading again until replaced
    }
  }

// ========================================================================================================================
// ========================================================================================================================




 // 🟢 File selection for image
onFileSelected(event: any, index: number) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    alert('Only PNG and JPG images allowed!');
    input.value = '';
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert('File must be less than 5 MB!');
    input.value = '';
    return;
  }

  //Show info about old ID and new file
  const existingId = this.imageIds[index];
  if (existingId) {
    alert(`Replacing existing image:\n` + `• Existing Image ID: ${existingId}\n` +`• New File: ${file.name}`);
  } else {
    alert(`New image added in empty slot:\n` +`• File: ${file.name}`);
  }

  //Preview new image
  const reader = new FileReader();
  reader.onload = () => (this.imageSlots[index] = reader.result);
  reader.readAsDataURL(file);

  // Replace old file data
  this.files[index] = file;
  this.imageIds[index] = null; // new upload replaces old
  input.value = '';

  //MODIFIED PRODUCT FILES 
    const formData = new FormData();
    formData.append('files', file);
    if (existingId) {
      formData.append('existingImageIds', existingId);
    }
  this.modifiedProductFiles(formData, existingId);
}


modifiedProductFiles(formData:any , productFileId:any)
{   
    this.spinner.show();
    this.productFilesService.fileUploadService(formData, productFileId , this.productId).subscribe({
      next: (res: any) => {
        console.log('Upload success:', res);
         this.toast.success({detail:"Success",summary:"File Update success", position:"topRight",duration:2000});

        // Replace the imageId from backend
        // if (res?.data && res.data.length > 0) {
        //   this.imageIds[index] = res.data[0].id;
        // }
        this.spinner.hide();

        //get Product Files
        this.getProductFilesById(this.productId);
      },
      error: (err: any) => {
        console.error('Upload error:', err);
        this.toast.error({detail:"Error",summary:"File Update Failed", position:"topRight",duration:2000});
        this.spinner.hide();
      },
    });
}

 
 removeImage(event: MouseEvent, index: number) {
    event.stopPropagation();
    this.imageSlots[index] = null;
    this.files[index] = null;
    this.imageIds[index] = null;
  }

  triggerFileInput(index: number) {
    document.getElementById('fileInput' + index)?.click();
  }


// Video Upload Handling
onVideoSelected(event: any) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext !== 'mp4') {
    alert('Only MP4 format allowed!');
    input.value = '';
    return;
  }

  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB < 1 || sizeMB > 50) {
    alert('Video must be between 1 MB and 50 MB!');
    input.value = '';
    return;
  }

  const existingVideoId = this.videoId;

  // Alert flow
  if (existingVideoId) {
    alert(
      `🟡 Replacing existing video:\n` +
      `• Existing Video ID: ${existingVideoId}\n` +
      `• New File: ${file.name}`
    );
  } else {
    alert(
      `🟢 New video selected:\n` +
      `• File: ${file.name}`
    );
  }

  // Preview
  this.videoFile = file;
  this.videoId = null; // new upload replaces old
  this.videoUrl = URL.createObjectURL(file);
  input.value = '';

   //MODIFIED PRODUCT FILES 
  const formData = new FormData();
  formData.append('files', file);
  if (existingVideoId) {
    formData.append('existingVideoId', existingVideoId);
  }

  this.modifiedVideoFile(formData,existingVideoId);
}



modifiedVideoFile(formData:any , productFileId:any)
{
  this.spinner.show();
    this.productFilesService.fileUploadService(formData, productFileId ,  this.productId).subscribe({
      next: (res: any) => {
        this.toast.success({detail:"Success",summary:"Video Upload success", position:"bottomRight",duration:3000});
        this.spinner.hide();

      //get Product Files
        this.getProductFilesById(this.productId);
      },
      error: (err: any) => {
        console.error('Upload error:', err);
        this.toast.error({detail:"Error",summary:"Error uploading image. Please try again.", position:"topRight",duration:2000});
        this.spinner.hide();
      },
    });
}

  removeVideo(event: MouseEvent) {
    event.stopPropagation();
    this.videoFile = null;
    this.videoId = null;
    this.videoUrl = null;
  }





















  // 🟢 Submit product confirmation modal
  @ViewChild('proceedModel') proceedModel!: ElementRef;

  productProceedModelShow() {
    const modal = new bootstrap.Modal(this.proceedModel.nativeElement);
    modal.show();
  }

  proceedModelClose() {
    const modal = bootstrap.Modal.getInstance(this.proceedModel.nativeElement);
    modal?.hide();
  }

  // 🟢 Validate and open modal
  submitProduct() {
    if (!this.imageSlots[0]) {
      this.toast.error({
        detail: 'Main image is required!',
        summary: 'Error',
        position: 'bottomRight',
        duration: 2000,
      });
      return;
    }
    this.productProceedModelShow();
  }





}
