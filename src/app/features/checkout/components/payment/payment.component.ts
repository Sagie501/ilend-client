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
  creditCardNumber: string;

  isVisa = undefined;

  public paymentForm: FormGroup;

  type$ = defer(() => this.paymentForm.get('creditCard').valueChanges).pipe(
    map((num: string) => CreditCard.cardType(num)),
    tap((type: string) => (this.isVisa = type === 'visa'))
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      creditCard: ['', [CreditCardValidators.validateCCNumber]],
      expDate: ['', [CreditCardValidators.validateExpDate]],
      cvc: [
        '',
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

  switch() {
    if (!this.creditCardNumber) {
      this.creditCardNumber = '5326 1900 8768 9302';
    }

    this.isVisa = !this.isVisa;
  }
}
