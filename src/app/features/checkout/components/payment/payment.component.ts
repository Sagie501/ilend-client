import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { defer, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CreditCardValidators, CreditCard } from 'angular-cc-library';
import { CardDefinition } from 'angular-cc-library/lib/credit-card';

@Component({
  selector: 'ile-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less'],
})
export class PaymentComponent implements OnInit, OnDestroy {

  creditCardType: string;
  subscriptions: Array<Subscription>;
  public paymentForm: FormGroup;

  type$ = defer(() => this.paymentForm.get('creditCard').valueChanges).pipe(
    map((num: string) => CreditCard.cardType(num)),
    tap((type: string) => (this.creditCardType = type))
  );

  cvc$ = defer(() => this.paymentForm.get('creditCard').valueChanges).pipe(
    map((num: string) => CreditCard.cardFromNumber(num)),
    tap((type: CardDefinition) => {
      let minCvcLength = 3;
      let maxCvcLength = 4;
      if (type) {
        minCvcLength = type.cvvLength[0];
        maxCvcLength = type.cvvLength[type.cvvLength.length - 1];
      }
      this.paymentForm.get('cvc')
        .setValidators([Validators.required,
          Validators.minLength(minCvcLength),
          Validators.maxLength(maxCvcLength)]);
    })
  );

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      name: [''],
      creditCard: ['', [CreditCardValidators.validateCCNumber]],
      expDate: ['', [CreditCardValidators.validateExpDate]],
      cvc: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
    });

    this.subscriptions = [
      this.type$.subscribe(),
      this.cvc$.subscribe()
    ];
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
