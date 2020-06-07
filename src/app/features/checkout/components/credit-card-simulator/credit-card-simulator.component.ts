import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ile-credit-card-simulator',
  templateUrl: './credit-card-simulator.component.html',
  styleUrls: ['./credit-card-simulator.component.less'],
})
export class CreditCardSimulatorComponent implements OnInit {

  @Input() creditCardType: CreditCardTypeEnum;
  @Input() cardNumber: string;
  @Input() name: string;
  @Input() expirationDate: string;

  constructor() {}

  ngOnInit(): void {}
}

export enum CreditCardTypeEnum {
  maestro = 'maestro',
  forbrugsforeningen = 'forbrugsforeningen',
  dankort = 'dankort',
  visa = 'visa',
  mastercard = 'mastercard',
  amex = 'amex',
  dinersclub = 'dinersclub',
  discover = 'discover',
  unionpay = 'unionpay',
  jcb = 'jcb'
}
