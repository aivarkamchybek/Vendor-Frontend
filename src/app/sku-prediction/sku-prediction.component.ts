import { Component } from '@angular/core';
import { PredictionService } from '../services/prediction.service';

@Component({
  selector: 'app-sku-prediction',
  templateUrl: './sku-prediction.component.html',
  styleUrls: ['./sku-prediction.component.css']
})
export class SkuPredictionComponent {
  sku: string = '';
  currentStock: number = 0;
  daysLeft: number | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private skuService: PredictionService) { }

  // Function to handle the form submission and call the backend
  getDaysLeft() {
    // Reset messages before making a new request
    this.errorMessage = '';
    this.successMessage = '';
    this.daysLeft = null;

    if (this.sku && this.currentStock > 0) {
      this.skuService.getDaysLeft(this.sku, this.currentStock).subscribe(
        (response: any) => {
          if (response && response.days_left !== undefined) {
            this.daysLeft = response.days_left;
            this.successMessage = `Days left: ${this.daysLeft}`;
          } else {
            this.errorMessage = 'SKU not found or data is unavailable.';
          }
        },
        (error) => {
          if (error.status === 404) {
            this.errorMessage = `Error: SKU ${this.sku} not found.`;
          } else {
            this.errorMessage = 'Error: Could not fetch data from the backend.';
          }
        }
      );
    } else {
      this.errorMessage = 'Please enter both SKU and current stock.';
    }
  }
}
