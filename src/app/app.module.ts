import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkulistComponent } from './skulist/skulist.component';
import { FormsModule } from '@angular/forms'; 

import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import the SKUComponent

@NgModule({
  declarations: [
    AppComponent,
    SkulistComponent
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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
