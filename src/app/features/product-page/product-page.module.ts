import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './containers/product-page/product-page.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    CommonModule,
    NgImageSliderModule,
    SharedModule
  ]
})
export class ProductPageModule { }
