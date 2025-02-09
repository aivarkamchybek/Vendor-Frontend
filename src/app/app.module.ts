import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkulistComponent } from './skulist/skulist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadExcelComponent } from './upload-excel/upload-excel.component'; // Import the SKUComponent
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SavedFileComponent } from './saved-file/saved-file.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SkuPredictionComponent } from './sku-prediction/sku-prediction.component';
import { ExcelSkuPredictionComponent } from './excel-sku-prediction/excel-sku-prediction.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    AppComponent,
    SkulistComponent,
    UploadExcelComponent,
    SavedFileComponent,
    SkuPredictionComponent,
    ExcelSkuPredictionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,// Add this for mat-icon
    MatPaginatorModule,
    ReactiveFormsModule  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
