import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment';


@Injectable({
  providedIn: 'root'
})
export class GetallskusService {


  private apiUrl = 'https://localhost:7069/api/Vendor';  // Replace with the actual backend API URL

  constructor(private http: HttpClient) { }

  // Get all SKUs from the backend
  getAllSkus(sortOrder: string): Observable<any> {
    const params = new HttpParams().set('sortOrder', sortOrder);
    return this.http.get<any>(`${this.apiUrl}/api/skus`, { params });
  }

  // Method to save Excel file to the backend
  saveExcelFile(fileName: string, fileContent: string): Observable<any> {
    const requestPayload = {
      fileName: fileName,
      fileContent: fileContent
    };
    return this.http.post(`${this.apiUrl}/save-excel`, requestPayload);
  }

  getExcelFilesList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list-excel-files`);
  }

  downloadExcelFile(fileId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download-excel?fileId=${fileId}`, {
      responseType: 'blob',
    });
  }

}
