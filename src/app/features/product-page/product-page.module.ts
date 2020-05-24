import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './containers/product-page/product-page.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { SharedModule } from '../../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    CommonModule,
    NgImageSliderModule,
    SharedModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class ProductPageModule { }
