import { Injectable } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';

const GROUP_NUMBER = 50;

@Injectable({
  providedIn: 'root',
})
export class PricesService {
  constructor() {}

  getPricesRanges(prices: number[]): number[] {
    let jumpValue = this.getJumpValue(prices);

    let values = new Array(GROUP_NUMBER).fill(0);

    prices.forEach((currPrice) => {
      let index =
        Math.floor(currPrice / jumpValue) === 0
          ? Math.floor(currPrice / jumpValue)
          : Math.floor(currPrice / jumpValue) - 1;

      values[index] += 1;
    });

    return values;
  }

  getJumpValue(prices: number[]): number {
    prices.sort((a, b) => a - b);

    return Math.floor(prices[prices.length - 1] / GROUP_NUMBER);
  }
}
