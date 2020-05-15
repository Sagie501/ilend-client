import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProductsComponent } from './containers/my-products/my-products.component';
import { SharedModule } from '../../../shared/shared.module';
import { NewProductDialogComponent } from './components/new-product-dialog/new-product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MaterialFileInputModule } from 'ngx-material-file-input';


@NgModule({
  declarations: [MyProductsComponent, NewProductDialogComponent],
  entryComponents: [NewProductDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MaterialFileInputModule
  ]
})
export class MyProductsModule { }
