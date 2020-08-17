import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { combineLatest, Subscription } from 'rxjs';
import { ProductsService } from '../../../../core/services/products/products.service';
import { FilterService } from '../../../filter-bar/services/filter/filter.service';
import { getLoggedInUser, UserState } from '../../../user/reducer/user.reducer';
import { Store } from '@ngrx/store';
import { User } from '../../../../core/models/user.model';
import * as _ from 'lodash';
import { shuffleArray } from '../../../../shared/helpers/array.helper';

@Component({
  selector: 'ile-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Array<Product>;
  filteredProducts: Array<Product> = [];
  loggedInUser: User;
  subscriptions: Array<Subscription>;

  constructor(private productsService: ProductsService, private filterService: FilterService, private userStore: Store<UserState>) {
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }),
      combineLatest([
        this.productsService.getProducts(),
        this.filterService.filteringFunction$
      ]).subscribe(([products, filterFunc]) => {
        this.products = products;
        this.filteredProducts = this.products.filter(filterFunc);
        if (this.loggedInUser) {
          let categoryProducts = this.filteredProducts
            .filter((product) => this.loggedInUser.favoriteCategories.map((category) => category.id).includes(product.category.id));
          let notCategoryProducts = _.differenceWith(this.filteredProducts, categoryProducts, _.isEqual);
          this.filteredProducts = shuffleArray(categoryProducts).concat(shuffleArray(notCategoryProducts));
        }
      })
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
