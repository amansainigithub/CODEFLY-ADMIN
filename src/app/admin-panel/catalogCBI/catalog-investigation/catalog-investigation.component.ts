import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { BucketService } from '../../../_services/bucket/bucket.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { MaterialService } from '../../../_services/catalogMetaDataServices/materialService/material.service';
import { CatalogInvestigationService } from '../../../_services/catalogCBI/catalog-investigation/catalog-investigation.service';

class FileUpload {
  selectedFile: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;
  uploadProgress: number = 0;
  isUploading: boolean = false;
}

declare var bootstrap: any; // Declare bootstrap for accessing modal methods
@Component({
  selector: 'app-catalog-investigation',
  templateUrl: './catalog-investigation.component.html',
  styleUrl: './catalog-investigation.component.css'
})
export class CatalogInvestigationComponent {
//Filter List For Searching
filteredItems:any = [];
progressCatalogList:any[]=[];

totalElements: number = 0;
currentPage: number = 1;
itemsPerPage: number = 10;

//SearchList
searchText: string = '';


ngOnInit(): void { 
  this.getMaterialByPagination({ page: "0", size: "10" });
}

constructor(
           private router:Router, 
           private cataloginvestigation:CatalogInvestigationService,
           private toast:NgToastService ,
           private bucket:BucketService,
           private spinner: NgxSpinnerService)
         {}



//GET MATERIAL PAGINATION START
getMaterialByPagination(request:any)
{
 this.spinner.show();
 this.cataloginvestigation.getProogressCatalogService(request)
 .subscribe(
   {
       next:(res:any)=> {
        console.log(res);
       this.progressCatalogList = res.data['content']
       this.filteredItems  = this.progressCatalogList;

       this.totalElements = res.data['totalElements'];
       this.toast.success({detail:"Success",summary:"Data Fetch Success", position:"bottomRight",duration:3000});
       this.spinner.hide();
     },
     error:(err:any)=>  {
       console.log(err)
       this.spinner.hide();
       this.toast.error({detail:"Error",summary:err.error.data.message, position:"bottomRight",duration:3000});

     }
   }
 );
}
//GET MATERIAL PAGINATION ENDING

nextPage(event: PageEvent) {
 console.log(event);
 const request:any = {};
 request['page'] = event.pageIndex.toString();
 request['size'] = event.pageSize.toString();
 this.getMaterialByPagination(request);
}


//Search Starting
  onSearch() {
   const searchQuery = this.searchText.trim().toLowerCase();

   if (searchQuery) {
     this.filteredItems = this.progressCatalogList.filter(item => 
       item.material.toLowerCase().includes(searchQuery)
     );
   } else {
     this.filteredItems = this.progressCatalogList;
   }
 }
//Search Ending




selectedData: any = null;
openModal(data: any) {
  //catalog Master
  this.getCatalogMasters();

  this.selectedData = data;
  this.updateform = data;

  // Use Bootstrap's JavaScript API to show the modal
  const modalElement = document.getElementById('actionedModal')!;
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

performAction() {
  console.log('Action performed for:', this.selectedData);
  // Add your function logic here
}






updateform: any = {
  id:null,
  username :null,
  categoryId :null,
  categoryName:null,
  sellerStoreName:null,
  catalogName:null,
  catalogSubTitle:null,
  catalogFrontFile:null,
  catalogThumbnail:null,
  file_1:null,
  file_2:null,
  file_3:null,
  file_4:null,
  catalogStatus:null,
  gst:null,
  hsnCode:null,
  size:null,
  weight:null,
  styleCode:null,
  netQuantity:null,
  catalogLength:null,
  catalogBreath:null,
  catalogHeight:null,
  material:null,
  catalogType:null,
  catalogClr:"Red", 
  manufactureDetails:null,
  packerDetails:null,
  tags:null,
  description:null,
  sku:null,
  identifier:null,
  searchKey:null,
  sellActualPrice:null,
  defectiveReturnPrice:null,
  mrp:null,
  inventory:null
};


parentList = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
  { id: 3, name: 'Category 3' },
  // Add more categories as needed
];


hsnCodeList:any="";
sizeList:any="";
netQuantityList:any="";
materialList:any="";
catalogTypeList:any="";

getCatalogMasters(){
  this.spinner.show();
  ///save Catalog Form Data
  this.cataloginvestigation.getCatalogMasters().subscribe(
    {
        next:(res:any)=> {
        console.log(res);

        //Hsn List
        this.hsnCodeList = res.data.hsn;
        
        //Size List  
        this.sizeList = res.data.catalogSize;

        //Size List  
        this.netQuantityList = res.data.netQuantityList;

        //Material List  
        this.materialList = res.data.materialList;

        //Material List  
        this.catalogTypeList = res.data.typeList;

        this.spinner.hide();
      },
      error:(err:any)=>  {
        console.log(err)
        this.spinner.hide();
        this.toast.error({detail:"Error",summary:"Error in fetching Masters", position:"bottomRight",duration:3000});
      }
    }
  );
}




isModalOpen = false;
// Function to open the modal
openModalSm(catalogId:any) {
  this.isModalOpen = true;

  console.log("Open Model Running " + catalogId);
  

  this.saveCatalog(catalogId);
}

// Function to close the modal
closeModalSm() {
  this.isModalOpen = false;
}

// Function to handle confirm action
confirmActionSm() {

 console.log("Open Model Sm Starting");
}




firstFile:any = "";
filesNew: (File | null)[] = [null, null, null, null, null];
///Upload Files on Button Click All Files
saveCatalog(catalogId:any) {

  console.log("saved Catalog Process Starting");
  

  //Show Spinner
  this.spinner.show();

  const formData = new FormData();

  // Upload First File Main Catalog Image
  formData.append(`files`, this.firstFile);
  formData.append(`indexes`, '00'); // Append the index of each file

  this.filesNew.forEach((file, index) => {
    if (file) {
      formData.append(`files`, file); // Append each file if it's selected
    }
  });

  const catalogData = JSON.stringify(this.updateform);

  // Add catalogData as JSON blob
  formData.append('catalogData', new Blob([catalogData], { type: 'application/json' }));

  // Wait for 3 seconds before calling the service
  setTimeout(() => {
    this.cataloginvestigation.updateCatalogService(catalogData, formData, catalogId).subscribe({
      next: (response) => { 
        this.toast.success({ detail: "Success", summary: "Catalog Saved Success", position: "bottomRight", duration: 3000 });
        
        //close the Model
        //this.closeModal();

        //Hide the Spinner
        this.spinner.hide();

        //redirect to Catalog
        localStorage.setItem("CUS","SUCCESS");
        alert("Catalog Upload Success ")
      },
      error: (error) => {
        console.error('Failed | Catalog Not Saved ', error);
        this.toast.error({ detail: "Failed", summary: "Catalog Upload Failed", position: "bottomRight", duration: 3000 });
        this.spinner.hide();

         //redirect to Catalog
         localStorage.setItem("CUS","SUCCESS");
         alert("Catalog Upload Failed")
      }
    });
  }, 1000); // 3000 milliseconds = 3 seconds

}


}
