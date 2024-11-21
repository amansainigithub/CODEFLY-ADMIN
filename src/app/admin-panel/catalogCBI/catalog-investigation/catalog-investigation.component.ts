import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { BucketService } from '../../../_services/bucket/bucket.service';
import { PageEvent } from '@angular/material/paginator';
import { CatalogInvestigationService } from '../../../_services/catalogCBI/catalog-investigation/catalog-investigation.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';



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
           private spinner: NgxSpinnerService,
           private datePipe:DatePipe)
         {}



//GET MATERIAL PAGINATION START
catalogProgressList(request:any)
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
       this.currentPage = res.data.pageable['pageNumber'];
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



hsnCodeList:any="";
sizeList:any="";
netQuantityList:any="";
materialList:any="";
catalogTypeList:any="";
gstList:any;
weightList:any;
lengthList:any;
breathList:any;
heightList:any;
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

        //Type List  
        this.catalogTypeList = res.data.typeList;

        //gstList List  
        this.gstList = res.data.gstPercentageList;

        //Weight List  
        this.weightList = res.data.catalogWeightList;

        //length List  
        this.lengthList = res.data.lengthList;

        //Breath List  
        this.breathList = res.data.catalogBreathList;

        //Height List  
        this.heightList = res.data.heightLists;

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

         this.catalogProgressList({page:this.currentPage,size:this.itemsPerPage})

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





//Search Starting
onSearch() {
  const searchQuery = this.searchText.trim().toLowerCase();
  console.log(searchQuery);
  
  if (searchQuery) {
    this.filteredItems = this.progressCatalogList.filter(item => 
      item.catalogId.toLowerCase().includes(searchQuery)
    );
  } else {
    this.filteredItems = this.progressCatalogList;
  }
}
//Search Ending

startDate: Date | null = null;
endDate: Date | null = null;
onDateRangeChange(): void {

  console.log(this.startDate);
  console.log(this.endDate);
  

   // Use DatePipe to format the start and end dates to MM/DD/YYYY
   const formattedStartDate = this.datePipe.transform(this.startDate, 'MM/dd/yyyy');
   const formattedEndDate = this.datePipe.transform(this.endDate, 'MM/dd/yyyy');

   console.log('Formatted Start Date:', formattedStartDate);
   console.log('Formatted End Date:', formattedEndDate);


  if (this.startDate && this.endDate) {
    const page = 0; // Example: Page number
    const size = 10; // Example: Page size

    this.spinner.show();
    this.cataloginvestigation.searchCatalogByDateService(page,size,formattedStartDate,formattedEndDate)
    .subscribe(
      {
          next:(res:any)=> {
          this.progressCatalogList = res.data['content']
          this.filteredItems  = this.progressCatalogList;
   
          this.totalElements = res.data['totalElements'];
          this.toast.success({detail:"Success",summary:"Data Fetch Success with Date Range", position:"bottomRight",duration:3000});
          this.spinner.hide();
        },
        error:(err:any)=>  {
          console.log(err)
          this.spinner.hide();
          this.toast.error(
            {
              detail:"Error",
              summary:"Data Fetch Failed Catalog investigation (Date Ranged)",
               position:"bottomRight",duration:3000
            }
          );
        }
      }
    );
  }

}

}
