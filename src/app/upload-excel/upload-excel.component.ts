import { Component } from '@angular/core';
import { UploadService } from '../service_upload/upload.service';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css']
})
export class UploadExcelComponent {
  vendorName: string = '';
  file: File | null = null;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private uploadService: UploadService) {}

  // Handle file selection
  onFileChange(event: any): void {
    this.file = event.target.files[0];
    this.errorMessage = '';  // Clear previous error
  }

  // Upload the file
  onUpload(): void {
    if (!this.file || !this.vendorName) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.loading = true; // Start loading

    this.uploadService.uploadFile(this.file, this.vendorName).subscribe({
      next: (response) => {
        this.loading = false; // Stop loading
        // Check if the response is successful (status 200)
        if (response.status === 200) {
          this.successMessage = 'File uploaded successfully!';
          this.errorMessage = ''; // Clear any previous error messages
        } else {
          // Handle unexpected success status
          this.errorMessage = 'File upload failed. Please try again.';
          this.successMessage = '';
        }
      },
      error: (error) => {
        // Handle error in case the upload fails
        console.log('Error:', error);  // Log error for debugging
        this.errorMessage = 'File upload failed. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
