import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ile-credit-card-simulator',
  templateUrl: './credit-card-simulator.component.html',
  styleUrls: ['./credit-card-simulator.component.less'],
})
export class CreditCardSimulatorComponent implements OnInit {
  @Input() isVisa: boolean;

  constructor() {}

  ngOnInit(): void {}
}
