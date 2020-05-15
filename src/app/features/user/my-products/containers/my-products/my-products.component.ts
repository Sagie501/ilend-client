import { Component, OnDestroy, OnInit } from '@angular/core';
import { getGreetingSentence } from 'src/app/shared/helpers/greeting-sentence.helper';
import { User } from '../../../../../core/models/user.model';
import { getLoggedInUser, getUserProducts, UserState } from '../../../reducer/user.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../../../../../core/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { NewProductDialogComponent } from '../../components/new-product-dialog/new-product-dialog.component';

@Component({
  selector: 'ile-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.less']
})
export class MyProductsComponent implements OnInit, OnDestroy {

  loggedInUser: User;
  userProducts: Array<Product>;
  getGreetingSentence = getGreetingSentence;
  subscriptions: Array<Subscription>;

  constructor(private userStore: Store<UserState>, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscriptions = [
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }),
      this.userStore.select(getUserProducts).subscribe((userProducts) => {
        this.userProducts = userProducts;
      })
    ];
  }

  openNewProductDialog() {
    this.dialog.open(NewProductDialogComponent, {
      autoFocus: false,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
