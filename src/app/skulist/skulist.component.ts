import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { GetallskusService } from '../getallskus.service';


// For xlsx library
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'; // Import saveAs from file-saver
import { MatSnackBar } from '@angular/material/snack-bar';

export interface SKU {
  name: string;
  sku: string;
  price: number;
  vendors: { [key: string]: number };
  quantity: number;
  uploadDate: string;
}

export interface SavedExcelFile {
  fileId: number;
  fileName: string;
  uploadDate: string;
}


@Component({
  selector: 'app-skulist',
  templateUrl: './skulist.component.html',
  styleUrls: ['./skulist.component.css']
})
export class SkulistComponent implements OnInit {
  skus: SKU[] = [];
  sortOrder: string = 'asc';
  vendorHeaders: string[] = [];
  displayedColumns: string[] = ['index', 'name', 'sku', 'quantity', 'uploadDate']; // Initial columns
  selectedVendors: string[] = [];  // Holds selected vendor names

  loading: boolean = false;


  savedExcelFiles: SavedExcelFile[] = [];
  

  selectedPriceLevels: { cheapest: boolean} = {
    cheapest: false
  };
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private skuService: GetallskusService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadSkus();
  }

  loadSkus(): void {
    this.loading = true; // Start loading
    this.skuService.getAllSkus(this.sortOrder).subscribe({
      next: (data: any) => {
        if (Array.isArray(data.$values)) {
          // Remove $id from each SKU object
          this.skus = data.$values.map((sku: any) => this.removeIdProperty(sku));
          this.vendorHeaders = this.getVendorHeaders(this.skus);
  
          // Update displayed columns to include vendor headers dynamically
          this.displayedColumns = ['index', 'name', 'sku', 'quantity', ...this.vendorHeaders, 'uploadDate'];
        }
        this.loading = false; // Stop loading
      },
      error: (err) => {
        console.error('Error fetching SKUs:', err);
        this.loading = false; // Stop loading
      }
    });
  }
  
  // Recursive function to remove $id from any object in the data
  removeIdProperty(obj: any): any {
    const { $id, ...cleanedObj } = obj;
    Object.keys(cleanedObj).forEach(key => {
      if (cleanedObj[key] && typeof cleanedObj[key] === 'object') {
        cleanedObj[key] = this.removeIdProperty(cleanedObj[key]);
      }
    });
    return cleanedObj;
  }
  
  getVendorHeaders(skus: SKU[]): string[] {
    const vendors = new Set<string>();
    skus.forEach(sku => {
      Object.keys(sku.vendors).forEach(vendor => vendors.add(vendor));
    });
    return Array.from(vendors);
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.loadSkus();
  }

    // Get the cheapest price from the vendors for a given SKU
    getCheapestPrice(vendors: { [key: string]: number }): number {
      return Math.min(...Object.values(vendors));
    }
  
    // Get the vendor name with the cheapest price for a given SKU
    getSecondCheapestPrice(vendors: { [key: string]: number }): number | null {
      const prices = Object.values(vendors);
      const sortedPrices = [...prices].sort((a, b) => a - b);
      const secondCheapestPrice = sortedPrices[1];
    
      return secondCheapestPrice !== undefined ? secondCheapestPrice : null;
    }

    getThirdCheapestPrice(vendors: { [key: string]: number }): number | null {
      const prices = Object.values(vendors);
      const sortedPrices = [...prices].sort((a, b) => a - b);
      const thirdCheapestPrice = sortedPrices[2]; // Index 2 represents the third cheapest
  
      return thirdCheapestPrice !== undefined ? thirdCheapestPrice : null;
    }

  // Filtered data for export
  exportAsExcel(): void {
    const dataToExport = this.skus
      .map((sku, index) => {

          // Determine the vendors to include
      const filteredVendors = this.selectedVendors.length > 0
      ? this.selectedVendors
      : Object.keys(sku.vendors); // If no vendors are selected, include all vendors

        
        // Apply price level filters
        const filteredPrices = filteredVendors.map(vendor => sku.vendors[vendor]);

        const cheapestPrice = this.getCheapestPrice(sku.vendors);

        

        // Check if the selected price levels match the price data
        const isValidPriceLevel = (price: number, level: string) => {
          switch (level) {
            case 'cheapest':
              return price === cheapestPrice;
            default:
              return false;
          }
        };

      // Determine if the SKU matches selected price levels or include all if no levels are selected
      const isValidSKU = this.selectedPriceLevels.cheapest
        ? this.checkSelectedPriceLevels(filteredPrices, isValidPriceLevel)
        : true; // Include all SKUs if no price level is selected

        if (isValidSKU) {
          const vendorsData = filteredVendors.reduce((acc, vendor) => {
            acc[vendor] = sku.vendors[vendor] || '';
            return acc;
          }, {} as { [key: string]: string | number });

          return {
            Index: index + 1,
            Name: sku.name,
            SKU: sku.sku,
            Quantity: sku.quantity,
            ...vendorsData, // Dynamically include vendor data
            UploadDate: sku.uploadDate
          };
        }
        return null;
      })
      .filter(item => item !== null);

    // Create a worksheet and export the data
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SKUs');

    // Save the file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, 'SKUs.xlsx');
  }

  checkSelectedPriceLevels(filteredPrices: number[], isValidPriceLevel: (price: number, level: string) => boolean): boolean {
    let isValid = false;
    
  
    // Ensure filteredPrices has enough entries
    if (filteredPrices.length < 1) {
      console.warn('Not enough prices in filteredPrices');
    }
  
    // Check for each selected price level independently
    if (this.selectedPriceLevels.cheapest) {
      isValid = isValid || isValidPriceLevel(filteredPrices[0], 'cheapest');
    }
  
    return isValid;
  }
  // Method to save the file as Excel
  saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, fileName);
  }
  

  saveFileToBackend(): void {
    const dataToExport = this.skus
      .map((sku, index) => {
        const filteredVendors = this.selectedVendors.length > 0
          ? this.selectedVendors
          : Object.keys(sku.vendors); // If no vendors are selected, include all vendors
  
        const filteredPrices = filteredVendors.map(vendor => sku.vendors[vendor]);
        const cheapestPrice = this.getCheapestPrice(sku.vendors);
  
        const isValidSKU = this.selectedPriceLevels.cheapest
          ? this.checkSelectedPriceLevels(filteredPrices, (price: number) => price === cheapestPrice)
          : true;
  
        if (isValidSKU) {
          const vendorsData = filteredVendors.reduce((acc, vendor) => {
            acc[vendor] = sku.vendors[vendor] || '';
            return acc;
          }, {} as { [key: string]: string | number });
  
          return {
            Index: index + 1,
            Name: sku.name,
            SKU: sku.sku,
            Quatity: sku.quantity,
            ...vendorsData,
            UploadDate: sku.uploadDate
          };
        }
        return null;
      })
      .filter(item => item !== null);
  
  // Format the date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Generate the filename with the current date
  const fileName = `Report_${formattedDate}.xlsx`;
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SKUs');
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    // Convert the buffer to Base64 to send to the backend
    const base64File = this.arrayBufferToBase64(excelBuffer);
    
    // Call the save method in the service
    this.skuService.saveExcelFile(fileName, base64File).subscribe({
      next: (response) => {
        console.log('File saved successfully:', response);
        // Show success message using MatSnackBar
        this.snackBar.open('File saved successfully!', 'Close', {
          duration: 3000, // 3 seconds
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      error: (err) => {
        console.error('Error saving file:', err);
        // Show error message using MatSnackBar
        this.snackBar.open('Error saving file. Please try again!', 'Close', {
          duration: 3000, // 3 seconds
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['error-snackbar'] // Optional: style for error messages
        });
      }
    });
  }
  
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const uint8Array = new Uint8Array(buffer);
    let binaryString = '';
  
    // Build a binary string from the uint8Array
    uint8Array.forEach(byte => {
      binaryString += String.fromCharCode(byte);
    });
  
    // Return the Base64 encoded string
    return window.btoa(binaryString);
  }
  
  deleteAllData(): void {
    if (confirm("Are you sure you want to delete all data? This action cannot be undone.")) {
      this.loading = true;
      this.skuService.deleteAllData().subscribe({
        next: () => {
          this.loading = false;
          this.skus = []; // Clear the table data
          this.snackBar.open("All data has been deleted successfully!", "Close", {
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "center",
          });
          this.loadSkus(); // Reload the SKU data to update the page
        },
        error: (err) => {
          this.loading = false;
          console.error("Error deleting all data:", err);
          this.snackBar.open("Error deleting data!", "Close", {
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "center",
          });
        },
      });
    }
  }
}
