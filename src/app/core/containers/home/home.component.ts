import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../services/user/user.service';
import { combineLatest, Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import { FilterService } from '../../../features/filter-bar/services/filter/filter.service';

@Component({
  selector: 'ile-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {

  products: Array<Product> = [];
  filteredProducts: Array<Product> = [];
  imagesMap: Map<string, Array<any>> = new Map();
  subscriptions: Array<Subscription>;

  constructor(private productsService: ProductsService, private userService: UserService, private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.subscriptions = [
      combineLatest([
        this.productsService.getProducts(),
        this.filterService.filteringFunction$
      ]).subscribe(([products, filterFunc]) => {
        this.products = products;
        this.setImagesMap(products);
        this.filteredProducts = this.products.filter(filterFunc);
      }),
      this.userService.login('Sagie012@gmail.com', '123456').subscribe((res) => {
        console.log(res);
      })
    ];
  }

  setImagesMap(products: Array<Product>) {
    products.forEach((product) => {
      if (!this.imagesMap.has(product.id)) {
        this.imagesMap.set(product.id, product.pictureLinks.map((link) => {
          return {
            thumbImage: link
          };
        }));
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
