import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutComponent } from './containers/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CreditCardSimulatorComponent } from './components/credit-card-simulator/credit-card-simulator.component';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatNativeDateModule,
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';

export const LEASE_DATES_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

export class LeaseDatesAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return `${date.getDate()} / ${
        date.getMonth() + 1
      } / ${date.getFullYear()}`;
    }

    return date.toDateString();
  }
}

@NgModule({
  declarations: [
    CheckoutComponent,
    PaymentComponent,
    CreditCardSimulatorComponent,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: LeaseDatesAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: LEASE_DATES_FORMATS,
    },
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CreditCardDirectivesModule,
  ],
})
export class CheckoutModule {}
