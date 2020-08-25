import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProductsComponent } from './containers/my-products/my-products.component';
import { SharedModule } from '../../../shared/shared.module';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { AppRoutingModule } from '../../../app-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    MyProductsComponent,
    ProductDialogComponent,
    ProductsTableComponent,
  ],
  entryComponents: [ProductDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MaterialFileInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
  ],
})
export class MyProductsModule {}
