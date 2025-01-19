import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment';


@Injectable({
  providedIn: 'root'
})
export class GetallskusService {


  private apiUrl = 'https://localhost:7069/api/Vendor/api/skus';  // Replace with the actual backend API URL

  constructor(private http: HttpClient) { }

  // Get all SKUs from the backend
  getAllSkus(sortOrder: string): Observable<any> {
    const params = new HttpParams().set('sortOrder', sortOrder);
    return this.http.get<any>(this.apiUrl, { params });
  }
}
