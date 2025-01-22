import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {


  private apiUrl = 'https://localhost:7069/api/Vendor'; 

  constructor(private http: HttpClient) {}

  uploadFile(file: File, vendorName: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('vendorName', vendorName);

    const headers = new HttpHeaders();

    // Observing the full response and specifying response type as 'text'
    return this.http.post(`${this.apiUrl}/upload-excel`, formData, {
      headers,
      observe: 'response',
      responseType: 'text'  // Specify that the response is plain text
    }).pipe(
      catchError(error => {
        // Handle error response here (status code 4xx, 5xx)
        throw error;
      })
    );
  }

  
}