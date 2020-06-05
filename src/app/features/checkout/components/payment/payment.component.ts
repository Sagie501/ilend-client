import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { defer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CreditCardValidators, CreditCard } from 'angular-cc-library';

@Component({
  selector: 'ile-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less'],
})
export class PaymentComponent implements OnInit {

  creditCardType: string;

  public paymentForm: FormGroup;

  type$ = defer(() => this.paymentForm.get('creditCard').valueChanges).pipe(
    map((num: string) => CreditCard.cardType(num)),
    tap((type: string) => (this.creditCardType = type))
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      name: [''],
      creditCard: ['', [CreditCardValidators.validateCCNumber]],
      expDate: ['', [CreditCardValidators.validateExpDate]],
      cvc: [
        '',
        // TODO: Take the cvc length from the card type
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
    });

    this.type$.subscribe();
  }

  public goToNextField(controlName: string, nextField: HTMLInputElement) {
    if (this.paymentForm.get(controlName)?.valid) {
      nextField.focus();
    }
  }

  hasCreditCard(): boolean {
    if (
      this.paymentForm.get('creditCard') &&
      this.paymentForm.get('creditCard').value &&
      this.paymentForm.get('creditCard').value.length > 0
    ) {
      return true;
    }
    return false;
  }

  getValue(name: string): string {
    if (
      this.paymentForm.get(name) &&
      this.paymentForm.get(name).value &&
      this.paymentForm.get(name).value.length > 0
    ) {
      return this.paymentForm.get(name).value;
    }
    return '';
  }

  checkout() {
    console.log(this.paymentForm.value);
  }
}
