import { Component, OnDestroy, OnInit } from '@angular/core';
import { getGreetingSentence } from 'src/app/shared/helpers/greeting-sentence.helper';
import { User } from '../../../../../core/models/user.model';
import { getLoggedInUser, getUserProducts, UserState } from '../../../reducer/user.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../../../../../core/models/product.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewProductDialogComponent } from '../../components/new-product-dialog/new-product-dialog.component';
import { addNewProduct } from '../../../actions/user.actoins';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  dialogRef: MatDialogRef<NewProductDialogComponent>;

  constructor(private userStore: Store<UserState>, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }),
      this.userStore.select(getUserProducts).subscribe((userProducts) => {
        this.userProducts = userProducts;
        if (this.loggedInUser && this.dialogRef) {
          this.snackBar.open('Your new product created!', 'OK', {
            duration: 3000
          });
          this.dialogRef.close();
          this.dialogRef = null;
        }
      })
    ];
  }

  openNewProductDialog() {
    this.dialogRef = this.dialog.open(NewProductDialogComponent, {
      autoFocus: false
    });

    this.subscriptions.push(
      this.dialogRef.componentInstance.createProductEvent.subscribe((newProduct) => {
        let categoryId = newProduct.category.id;
        delete newProduct.category;
        newProduct.pictureLinks = [];

        let promise = new Promise((resolve) => {
          let finishedFiles = 0;
          for (let file of newProduct.imageFiles._files) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
              finishedFiles++;
              newProduct.pictureLinks.push(e.target.result.split(',')[1]);
              if (finishedFiles === newProduct.imageFiles._files.length) {
                delete newProduct.imageFiles;
                resolve();
              }
            };
            reader.readAsDataURL(file);
          }
        });

        promise.then(() => {
          this.userStore.dispatch(addNewProduct({ categoryId, product: newProduct }));
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
