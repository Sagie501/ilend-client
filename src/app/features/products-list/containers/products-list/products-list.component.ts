import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { combineLatest, Subscription, Subject, Observable } from 'rxjs';
import { ProductsService } from '../../../../core/services/products/products.service';
import { FilterService } from '../../../filter-bar/services/filter/filter.service';
import { getLoggedInUser, UserState } from '../../../user/reducer/user.reducer';
import { Store } from '@ngrx/store';
import { User } from '../../../../core/models/user.model';
import * as _ from 'lodash';
import { shuffleArray } from '../../../../shared/helpers/array.helper';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'ile-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Array<Product>;
  filteredProducts: Array<Product> = [];
  loggedInUser: User;
  subscriptions: Array<Subscription>;

  filteredProducts$: Observable<Product[]> = combineLatest([
    this.productsService.getProducts(),
    this.filterService.filteringFunction$,
  ]).pipe(
    distinctUntilChanged(),
    map(([products, filterFunc]) => products.filter(filterFunc)),
    map((filteredProducts) => {
      if (this.loggedInUser) {
        let categoryProducts = filteredProducts.filter((product) =>
          this.loggedInUser.favoriteCategories
            .map((category) => category.id)
            .includes(product.category.id)
        );
        let notCategoryProducts = _.differenceWith(
          filteredProducts,
          categoryProducts,
          _.isEqual
        );
        filteredProducts = shuffleArray(categoryProducts).concat(
          shuffleArray(notCategoryProducts)
        );
      }

      return filteredProducts;
    })
  );

  constructor(
    private productsService: ProductsService,
    private filterService: FilterService,
    private userStore: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }),
    ];
  }

  itemTrackBy(index: number, product: Product) {
    return product ? product.id : null;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
