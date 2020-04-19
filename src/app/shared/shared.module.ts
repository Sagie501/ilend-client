import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { AmountComponent } from './components/amount/amount.component';
import { UserNameCircleComponent } from './components/user-name-circle/user-name-circle.component';
import { ButtonComponent } from './components/button/button.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { ImageComponent } from './components/image/image.component';

@NgModule({
  declarations: [
    SearchComponent,
    CheckboxComponent,
    AmountComponent,
    UserNameCircleComponent,
    ButtonComponent,
    OrderStatusComponent,
    ImageComponent,
  ],
  imports: [CommonModule],
  exports: [
    SearchComponent,
    CheckboxComponent,
    AmountComponent,
    UserNameCircleComponent,
    ButtonComponent,
    OrderStatusComponent,
    ImageComponent,
  ],
})
export class SharedModule {
}
