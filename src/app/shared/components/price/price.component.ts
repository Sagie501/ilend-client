import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ile-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.less'],
})
export class PriceComponent implements OnInit {
  @Input() price: number;
  @Input() isLarge: boolean = false;
  @Input() isSmall: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
