import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ile-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.less'],
})
export class AmountComponent implements OnInit {
  @Input() amount: number;

  constructor() {}

  ngOnInit(): void {}
}
