import { Component, OnInit, Inject } from '@angular/core';
import { PriceFilter } from '../../models/price-filter.model';
import { PRICE_DIALOG_DATA, PRICE_DIALOG_CALLBACK, PRICE_DIALOG_MINIMUM, PRICE_DIALOG_MAXIMUM, PRICE_DIALOG_JUMP } from '../../consts';

@Component({
  selector: 'ile-price-filter-overlay',
  templateUrl: './price-filter-overlay.component.html',
  styleUrls: ['./price-filter-overlay.component.less']
})
export class PriceFilterOverlayComponent implements OnInit {

  constructor(@Inject(PRICE_DIALOG_DATA) public data: number[],
    @Inject(PRICE_DIALOG_MINIMUM) public currentMinimum: number,
    @Inject(PRICE_DIALOG_MAXIMUM) public currentMaximum: number,
    @Inject(PRICE_DIALOG_JUMP) public jumpValue: number,
    @Inject(PRICE_DIALOG_CALLBACK)
    public callback: (change: PriceFilter) => void) { }

  ngOnInit(): void {
  }

  changed(change: { minimum: number; maximum: number }) {
    this.callback({ from: change.minimum, to: change.maximum });
  }

}
