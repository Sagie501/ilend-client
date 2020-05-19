import { Component, OnDestroy, OnInit } from '@angular/core';
import { getGreetingSentence } from 'src/app/shared/helpers/greeting-sentence.helper';
import { User } from '../../../../../core/models/user.model';
import { getLoggedInUser, getUserProducts, UserState } from '../../../reducer/user.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../../../../../core/models/product.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewProductDialogComponent } from '../../components/new-product-dialog/new-product-dialog.component';
import { addNewProduct, deleteProduct, updateProduct } from '../../../actions/user.actoins';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileInput } from 'ngx-material-file-input';

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

  async openEditProductDialog(productId: string) {
    let product = this.userProducts.find((product) => product.id === productId);

    this.dialogRef = this.dialog.open(NewProductDialogComponent, {
      autoFocus: false,
      data: {
        name: product.name,
        description: product.description,
        requestedPrice: product.requestedPrice,
        category: product.category,
        imageFiles: new FileInput(await this.getBlobFilesForImagesProducts(product.pictureLinks, product.name))
      }
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
          this.userStore.dispatch(updateProduct({ productId, categoryId, product: newProduct }));
        });
      })
    );
  }

  deleteProduct(productId: string) {
    this.userStore.dispatch(deleteProduct({ productId }));
  }

  getBlobFilesForImagesProducts(imagesURLS: Array<string>, productName: string): Promise<Array<File>> {
    let special = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
    let deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

    // TODO: Move it to helper?
    function stringifyNumber(n) {
      if (n < 20) {
        return special[n];
      }
      if (n % 10 === 0) {
        return deca[Math.floor(n / 10) - 2] + 'ieth';
      }
      return deca[Math.floor(n / 10) - 2] + 'y-' + special[n % 10];
    }

    return new Promise<Array<File>>((resolve) => {
      let finishedFiles = 0;
      let files: Array<File> = [];
      imagesURLS.forEach((imageURL) => {
        let request = new XMLHttpRequest();
        request.open('GET', imageURL, true);
        request.responseType = 'blob';
        request.onload = () => {
          finishedFiles++;
          files.push(new File([request.response],
            `${productName} ${stringifyNumber(finishedFiles)} image`,
            { lastModified: new Date().getTime() }));
          if (finishedFiles === imagesURLS.length) {
            resolve(files);
          }
        };
        request.send();
      });
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
