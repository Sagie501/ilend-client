import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ile-suggested-price',
  templateUrl: './suggested-price.component.html',
  styleUrls: ['./suggested-price.component.less'],
})
export class SuggestedPriceComponent implements OnInit {
  @Input() suggestedPrice: number;

  constructor() {}

  ngOnInit(): void {}
}
