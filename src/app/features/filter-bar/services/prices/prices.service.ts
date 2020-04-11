import { Injectable } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';

const GROUP_NUMBER = 50;

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  prices = []

  constructor() {
    // TODO: Use the real products when there are products
    for (let index = 0; index < 200; index++) {
      this.prices.push(Math.random() * 1000);
    }
  }

  getPricesRanges(products: Product[]): number[] {
    // Get all the prices
    let prices: number[] = products.map((product) => product.requestedPrice);

    let jumpValue = this.getJumpValue(products);

    let values = new Array(GROUP_NUMBER).fill(0);

    this.prices.forEach(currPrice => {
      let index = Math.floor(currPrice / jumpValue) === 0 ? Math.floor(currPrice / jumpValue) : Math.floor(currPrice / jumpValue) - 1;

      values[index] += 1;
    });

    return values;
  }

  getJumpValue(products: Product[]): number {
    // TODO: Use the real products when there are products
    this.prices.sort((a, b) => a - b);

    return Math.floor(this.prices[this.prices.length - 1] / GROUP_NUMBER);
  }
}
