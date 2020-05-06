import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { AmountComponent } from './components/amount/amount.component';
import { UserNameCircleComponent } from './components/user-name-circle/user-name-circle.component';
import { ButtonComponent } from './components/button/button.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { ImageComponent } from './components/image/image.component';
import { ImagesSliderComponent } from './components/images-slider/images-slider.component';
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [
    SearchComponent,
    CheckboxComponent,
    AmountComponent,
    UserNameCircleComponent,
    ButtonComponent,
    OrderStatusComponent,
    ImageComponent,
    ImagesSliderComponent,
  ],
  imports: [CommonModule, NgImageSliderModule],
  exports: [
    SearchComponent,
    CheckboxComponent,
    AmountComponent,
    UserNameCircleComponent,
    ButtonComponent,
    OrderStatusComponent,
    ImageComponent,
    ImagesSliderComponent,
  ],
})
export class SharedModule {
}
