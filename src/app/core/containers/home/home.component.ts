import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'ile-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  products$: Observable<Array<Product>> = this.productsService.getProducts();

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
  }
}
