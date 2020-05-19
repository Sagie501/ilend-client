import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { AmountComponent } from './components/amount/amount.component';
import { HeaderComponent } from './components/header/header.component';
import { UserNameCircleComponent } from './components/user-name-circle/user-name-circle.component';
import { ButtonComponent } from './components/button/button.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { ImageComponent } from './components/image/image.component';
import { ImagesSliderComponent } from './components/images-slider/images-slider.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataDiagramComponent } from './components/data-diagram/data-diagram.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    SearchComponent,
    CheckboxComponent,
    AmountComponent,
    HeaderComponent,
    UserNameCircleComponent,
    ButtonComponent,
    OrderStatusComponent,
    ImageComponent,
    ImagesSliderComponent,
    ProductCardComponent,
    DataTableComponent,
    DataDiagramComponent,
  ],
  imports: [CommonModule, NgImageSliderModule, AppRoutingModule],
  exports: [
    SearchComponent,
    CheckboxComponent,
    AmountComponent,
    HeaderComponent,
    UserNameCircleComponent,
    ButtonComponent,
    OrderStatusComponent,
    ImageComponent,
    ImagesSliderComponent,
    ProductCardComponent,
    DataTableComponent,
    DataDiagramComponent,
  ],
})
export class SharedModule {}
