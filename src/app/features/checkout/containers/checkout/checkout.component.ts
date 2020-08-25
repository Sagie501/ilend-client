import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { switchMap, pluck, tap } from 'rxjs/operators';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { clientTokenQuery } from '../../../../core/graphql/checkout.graphql';
import { Leasing } from 'src/app/core/models/leasing.model';
import { LeasingService } from 'src/app/core/services/leasing/leasing.service';
import * as moment from 'moment';

@Component({
  selector: 'ile-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.less'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  product: Product;
  subscriptions: Array<Subscription>;
  token: string;
  checkoutResult: { success: boolean; message?: string; leasingID?: string };
  returnDate: Date;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private leasingService: LeasingService,
    private apollo: Apollo
  ) {
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
      this.apollo
        .query<any>({
          query: clientTokenQuery,
        })
        .pipe(
          pluck('data', 'clientToken'),
          tap((token) => (this.token = token))
        )
        .subscribe(),
    ];
  }

  ngOnInit(): void {}

  openLeaseRequest(payload: { cardNonce: string; returnDate: Date }) {
    this.leasingService
      .openLeaseRequest(
        this.product,
        this.calculateTotalPrice(),
        payload.cardNonce,
        payload.returnDate.getTime(),
        new Date().getTime()
      )
      .subscribe(
        (leasing: Leasing) => {
          if (leasing) {
            this.checkoutResult = {
              success: true,
            };
          } else {
            this.checkoutResult = {
              success: false,
              message: 'Could not open lease request. Please try again later.',
            };
          }
        },
        (err) => {
          this.checkoutResult = {
            success: false,
            message: 'Could not open lease request. Please try again later.',
          };
        }
      );
  }

  returnDateUpdated(returnDate: Date) {
    this.returnDate = returnDate;
  }

  calculateTotalPrice(): number {
    if (this.returnDate) {
      let amountOfDays = moment(this.returnDate).diff(moment(), 'days') + 1;

      let priceWithoutFee = amountOfDays * this.product.requestedPrice;
      let priceWithFee = priceWithoutFee * 1.1;

      return priceWithFee;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
