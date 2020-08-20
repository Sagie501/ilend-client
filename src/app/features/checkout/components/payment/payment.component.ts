import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as client from 'braintree-web/client';
import * as hostedFields from 'braintree-web/hosted-fields';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ile-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  @Input() token: string;
  @Output() onCheckoutCompleted: EventEmitter<string> = new EventEmitter<
    string
  >();

  public paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      name: [''],
    });

    client.create(
      {
        authorization: this.token,
      },
      (err, clientInstance) => {
        if (err) {
          console.error(err);
          return;
        }
        this.createHostedFields(clientInstance);
      }
    );
  }

  isNameValidated: boolean = false;
  cardholderName: string;
  validateName(value: string) {
    this.isNameValidated = new RegExp(
      /^[a-zA-Z.'-]+(?: +[a-zA-Z.'-]+)+$/gm
    ).test(value);
    this.cardholderName = value;

    if (!this.isNameValidated) {
      document.getElementById('card-name').classList.add('invalid');
    } else {
      document.getElementById('card-name').classList.remove('invalid');
    }
  }

  createHostedFields(clientInstance) {
    let form = document.getElementById('checkout-form');
    let cardImage = document.getElementById('card-image');
    let header = document.getElementsByClassName('card-headline')[0];
    let buttonPay = document.getElementById('button-pay');
    hostedFields.create(
      {
        client: clientInstance,
        styles: {
          input: {
            color: '#282c37',
            'font-size': '16px',
            transition: 'color 0.1s',
            'line-height': '3',
          },
          // Style the text of an invalid input
          'input.invalid': {
            color: '#E53A40',
          },
          // placeholder styles need to be individually adjusted
          '::-webkit-input-placeholder': {
            color: 'rgba(0,0,0,0.6)',
          },
          ':-moz-placeholder': {
            color: 'rgba(0,0,0,0.6)',
          },
          '::-moz-placeholder': {
            color: 'rgba(0,0,0,0.6)',
          },
          ':-ms-input-placeholder': {
            color: 'rgba(0,0,0,0.6)',
          },
        },
        // Add information for individual fields
        fields: {
          number: {
            selector: '#card-number',
            placeholder: '1111 1111 1111 1111',
          },
          cvv: {
            selector: '#cvv',
            placeholder: '123',
          },
          expirationDate: {
            selector: '#expiration-date',
            placeholder: '10 / 2019',
          },
        },
      },
      function (err, hostedFieldsInstance) {
        if (err) {
          console.error(err);
          return;
        }

        hostedFieldsInstance.on(
          'validityChange',
          function (event) {
            if (this.isNameValidated) {
              // Check if all fields are valid, then show submit button
              var formValid = Object.keys(event.fields).every(function (key) {
                return event.fields[key].isValid;
              });

              if (formValid) {
                buttonPay.classList.add('show-button');
              } else {
                buttonPay.classList.remove('show-button');
              }
            }
          }.bind(this)
        );

        hostedFieldsInstance.on('empty', function (event) {
          header.classList.remove('header-slide');
          cardImage.className = '';
          form.className = '';
        });

        hostedFieldsInstance.on('cardTypeChange', function (event) {
          // Change card bg depending on card type
          if (event.cards.length === 1) {
            form.className = '';
            form.classList.add(event.cards[0].type);
            cardImage.className = '';
            cardImage.classList.add(event.cards[0].type);
            header.classList.add('header-slide');

            // Change the CVV length for AmericanExpress cards
            if (event.cards[0].code.size === 4) {
              hostedFieldsInstance.setAttribute({
                field: 'cvv',
                attribute: 'placeholder',
                value: '1234',
              });
            }
          } else {
            hostedFieldsInstance.setAttribute({
              field: 'cvv',
              attribute: 'placeholder',
              value: '123',
            });
          }
        });

        document.querySelector('input[type="submit"]').addEventListener(
          'click',
          function (event) {
            event.preventDefault();

            hostedFieldsInstance.tokenize(
              {
                cardholderName: this.cardholderName,
              },
              function (err, payload) {
                if (err) {
                  console.error(err);
                  return;
                }

                // This is where you would submit payload.nonce to your server
                this.onCheckoutCompleted.emit(payload.nonce);
              }.bind(this)
            );
          }.bind(this),
          false
        );
      }.bind(this)
    );
  }
}
