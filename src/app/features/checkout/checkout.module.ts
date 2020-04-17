import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutComponent } from './containers/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CreditCardSimulatorComponent } from './components/credit-card-simulator/credit-card-simulator.component';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CheckoutComponent,
    PaymentComponent,
    CreditCardSimulatorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CreditCardDirectivesModule,
  ],
})
export class CheckoutModule {}
