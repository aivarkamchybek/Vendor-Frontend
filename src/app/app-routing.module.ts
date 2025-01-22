import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { SkulistComponent } from './skulist/skulist.component';
import { SavedFileComponent } from './saved-file/saved-file.component';

const routes: Routes = [
  { path: 'upload-excel', component: UploadExcelComponent },
  { path: 'skulist', component: SkulistComponent },
  {path: 'saved-file', component: SavedFileComponent},
  { path: '', redirectTo: '/upload-excel', pathMatch: 'full' } // Optional: Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
