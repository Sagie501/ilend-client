import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ile-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.less'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  product: Product;
  subscriptions: Array<Subscription>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.activatedRoute.params
        .pipe(
          switchMap((params: Params) => {
            return this.productsService.getProductById(params.id);
          })
        )
        .subscribe((product: Product) => {
          this.product = product;
        }),
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
