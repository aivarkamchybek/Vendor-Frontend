import { Component, ViewChild } from '@angular/core';
import { PredictionService } from '../services/prediction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-excel-sku-prediction',
  templateUrl: './excel-sku-prediction.component.html',
  styleUrls: ['./excel-sku-prediction.component.css']
})
export class ExcelSkuPredictionComponent {
  uploadForm: FormGroup;
  uploadedData: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  isLoading = false;
  errorMessage: string | null = null;
  displayedColumns: string[] = ['sku', 'days_left'];
  sortDirection: boolean = true; // true for ascending, false for descending

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  constructor(private fb: FormBuilder, private skuUploadService: PredictionService) {
    this.uploadForm = this.fb.group({
      file: [null, Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadedData = []; // Clear previous data
      this.uploadForm.get('file')!.setValue(file); // Update form control for validation
    }
  }

  onSubmit(): void {
    if (this.uploadForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    const file = this.uploadForm.get('file')!.value;

    // Use the service to upload the file and get predictions
    this.skuUploadService.uploadExcel(file).subscribe(
      (response) => {
        this.isLoading = false;
        this.uploadedData = response;
        this.dataSource.data = this.uploadedData; // Update MatTableDataSource with new data
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to upload file. Please try again.';
        console.error(error);
      }
    );
  }

  // Sorting data manually
  sortData(column: string): void {
    this.sortDirection = !this.sortDirection; // Toggle the sorting direction
    this.uploadedData.sort((a, b) => {
      if (column === 'days_left') {
        return this.sortDirection
          ? a.days_left - b.days_left  // Ascending
          : b.days_left - a.days_left; // Descending
      }
      // Add sorting for other columns if needed
      return 0;
    });
    this.dataSource.data = this.uploadedData; // Update the data source
  }
}
