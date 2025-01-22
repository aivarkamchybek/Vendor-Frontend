import { Component } from '@angular/core';
import { GetallskusService } from '../getallskus.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-saved-file',
  templateUrl: './saved-file.component.html',
  styleUrls: ['./saved-file.component.css']
})


export class SavedFileComponent {
  displayedColumns: string[] = ['fileName', 'savedDate', 'actions'];
  errorMessage: string | null = null;
  files: any[] = [];

  constructor(private excelFileService: GetallskusService) {}

  ngOnInit(): void {
    this.loadExcelFiles();
  }

  loadExcelFiles() {
    this.excelFileService.getExcelFilesList().subscribe(
      (response: any) => {
        console.log('Response:', response); // Check the structure here
        // Extract the array from the $values property
        this.files = response?.$values || []; // Use $values if it exists
      },
      (error) => {
        alert('Error fetching files: ' + error.message);
      }
    );
  }


  downloadFile(fileId: number) {
    this.excelFileService.downloadExcelFile(fileId).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `file-${fileId}.xlsx`; // Adjust file naming as needed
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
