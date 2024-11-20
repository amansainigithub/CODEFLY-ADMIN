import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { BucketService } from '../../../_services/bucket/bucket.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { MaterialService } from '../../../_services/catalogMetaDataServices/materialService/material.service';
import { CatalogInvestigationService } from '../../../_services/catalogCBI/catalog-investigation/catalog-investigation.service';

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

//Model Flag (Open and Close)
isModalOpen = false;


parentList = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
  { id: 3, name: 'Category 3' }
];


actionStatusList = [
  { id: 1, name: 'QC_PASS' },
  { id: 2, name: 'QC_ERROR' }
];


errorList = [
  { id: 1, name: 'Error 1' },
  { id: 2, name: 'Error 2' },
  { id: 3, name: 'Error 3' },
  { id: 3, name: 'Error 4' },
  { id: 3, name: 'Error 5' }
];



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
  // file_1:null,
  // file_2:null,
  // file_3:null,
  // file_4:null,
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
  searchKey:null,
  sellActualPrice:null,
  defectiveReturnPrice:null,
  mrp:null,
  inventory:null,

  //investigation Data 
  actionStatus:"",
  errorMarked:"",
  otherSuggestion:""
};


ngOnInit(): void { 

  //Catalog masters
  this.getCatalogMasters();

  this.catalogProgressList({ page: "0", size: "10" });
}

constructor(
           private router:Router, 
           private cataloginvestigation:CatalogInvestigationService,
           private toast:NgToastService ,
           private bucket:BucketService,
           private spinner: NgxSpinnerService)
         {}



//GET MATERIAL PAGINATION START
catalogProgressList(request:any)
{
 this.spinner.show();
 this.cataloginvestigation.getProogressCatalogService(request)
 .subscribe(
   {
       next:(res:any)=> {
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
 const request:any = {};
 request['page'] = event.pageIndex.toString();
 request['size'] = event.pageSize.toString();
 this.catalogProgressList(request);
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

hsnCodeList:any="";
sizeList:any="";
netQuantityList:any="";
materialList:any="";
catalogTypeList:any="";
async getCatalogMasters(){
  this.spinner.show();
  ///save Catalog Form Data
  this.cataloginvestigation.getCatalogMasters().subscribe(
    {
        next:(res:any)=> {

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

catalogId:any;
takeAction(data: any){
 //Set Updated Data
 this.updateform = data;
 this.catalogId = data.id;
 this.toast.warning({ detail: "Success", summary: "Data Fetch Success", position: "bottomRight", duration: 3000 });
}


// Function to open the modal
catalogInvestigate() {
  this.isModalOpen = true;
}


//Validation on Model Pass Or Error
isDebugDisabled = false;
onActionStatusChange(event: Event): void {
  const selectedValue = (event.target as HTMLSelectElement).value;

  if (selectedValue === 'QC_PASS') {
    this.isDebugDisabled = true;
    this.updateform.errorMarked = ''; // Clear value if disabling
  } else {
    this.isDebugDisabled = false;
  }
}
//Validation on Model Pass Or Ending


//Catalog Investigation Starting
submitInvestigation() {
   //Show Spinner
   this.spinner.show();

   // Wait for 3 seconds before calling the service
   setTimeout(() => {
     this.cataloginvestigation.updateCatalogService(this.updateform,this.catalogId).subscribe({
       next: (res:any) => { 
         this.toast.success({ detail: "Success", summary: "Catalog Investigation Completed", position: "bottomRight", duration: 3000 });
         
         //Close the Model
         this.closeModal();

         //Hide the Spinner
         this.spinner.hide();
 
       },
       error: (error) => {
         console.error('Failed | Catalog Not Saved ', error);
         this.toast.error({ detail: "Failed", summary: "Catalog Upload Failed", position: "bottomRight", duration: 3000 });
         this.spinner.hide();
       }
     });
   }, 1000); // 3000 milliseconds = 3 seconds
}
//Catalog Investigation Ending


// Function to close the modal
closeModal() {
  this.isModalOpen = false;
}

}
