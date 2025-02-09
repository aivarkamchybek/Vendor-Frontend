import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private baseApiUrl = 'http://127.0.0.1:5000';  // URL for Flask API

  constructor(private http: HttpClient) { }

  // Function to get the days left until out of stock
  getDaysLeft(sku: string, currentStock: number): Observable<any> {
    const apiUrl = `${this.baseApiUrl}/get_days_left`;
    const payload = { sku, current_stock: currentStock };
    return this.http.post<any>(apiUrl, payload);
  }

    // Function to upload an Excel file and get predictions for all SKUs in the file
    uploadExcel(file: File): Observable<any> {
      const apiUrl = `${this.baseApiUrl}/upload_excel`;
      const formData = new FormData();
      formData.append('file', file, file.name);
  
      return this.http.post<any>(apiUrl, formData);
    }
}
