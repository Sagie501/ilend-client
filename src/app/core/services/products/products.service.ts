import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[];

  constructor() {}

  getProducts() {}
}
