import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { combineLatest, Subscription } from 'rxjs';
import { ProductsService } from '../../../../core/services/products/products.service';
import { FilterService } from '../../../filter-bar/services/filter/filter.service';

@Component({
  selector: 'ile-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Array<Product>;
  filteredProducts: Array<Product> = [];
  subscriptions: Array<Subscription>;

  constructor(private productsService: ProductsService, private filterService: FilterService) { }

  ngOnInit(): void {
    this.subscriptions = [
      combineLatest([
        this.productsService.getProducts(),
        this.filterService.filteringFunction$
      ]).subscribe(([products, filterFunc]) => {
        this.products = products;
        this.filteredProducts = this.products.filter(filterFunc);
      })
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
