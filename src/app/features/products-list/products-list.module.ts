import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './containers/products-list/products-list.component';
import { SharedModule } from '../../shared/shared.module';
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [ProductsListComponent],
  exports: [
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgImageSliderModule
  ]
})

export class ProductsListModule { }
