import { Component, OnDestroy, OnInit } from '@angular/core';
import { getGreetingSentence } from 'src/app/shared/helpers/greeting-sentence.helper';
import { User } from '../../../../../core/models/user.model';
import {
  getLoggedInUser,
  getUserProducts,
  UserState,
} from '../../../reducer/user.reducer';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../../../../../core/models/product.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductDialogComponent } from '../../components/product-dialog/product-dialog.component';
import {
  addNewProduct,
  deleteProduct,
  updateProduct,
} from '../../../actions/user.actoins';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileInput } from 'ngx-material-file-input';
import { ConfirmationDialogComponent } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { LeasingService } from 'src/app/core/services/leasing/leasing.service';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ile-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.less'],
})
export class MyProductsComponent implements OnInit, OnDestroy {
  loggedInUser: User;
  userProducts: Array<Product>;
  getGreetingSentence = getGreetingSentence;
  subscriptions: Array<Subscription>;
  productDialogRef: MatDialogRef<ProductDialogComponent>;
  deleteProductDialogRef: MatDialogRef<ConfirmationDialogComponent>;

  constructor(
    private userStore: Store<UserState>,
    private leasingsService: LeasingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  totalEarnings$: Observable<
    string
  > = this.leasingsService.getAllLeasingRequests().pipe(
    // Mapping the leasings to array of the prices
    map((leasings) => leasings.map((lease) => lease.total_price)),
    // Summing all the prices to a one total number
    map((prices) =>
      prices.length > 0
        ? prices.reduce((acc, curr) => acc + (curr ? curr : 0))
        : 0
    ),
    // The user only see his profits without our fees
    map((total) => (total / 1.1).toFixed(2)),
    distinctUntilChanged()
  );

  ngOnInit(): void {
    this.subscriptions = [
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }),
      this.userStore.select(getUserProducts).subscribe((userProducts) => {
        this.userProducts = userProducts;
        if (this.loggedInUser) {
          if (this.productDialogRef) {
            this.snackBar.open(
              this.productDialogRef.componentInstance.isCreatingMode
                ? 'Your new product created!'
                : 'Your product has been updated!',
              'OK',
              {
                duration: 3000,
              }
            );
            this.productDialogRef.close();
            this.productDialogRef = null;
          } else if (this.deleteProductDialogRef) {
            this.snackBar.open('Your product has been deleted!', 'OK', {
              duration: 3000,
            });
            this.deleteProductDialogRef.close();
            this.deleteProductDialogRef = null;
          }
        }
      }),
    ];
  }

  openNewProductDialog() {
    this.productDialogRef = this.dialog.open(ProductDialogComponent, {
      autoFocus: false,
    });

    this.productDialogRef.componentInstance.isCreatingMode = true;
    this.subscriptions.push(
      this.productDialogRef.componentInstance.saveProductEvent.subscribe(
        (newProduct) => {
          let categoryId = newProduct.category.id;
          delete newProduct.category;

          this.prepareProductToSave(newProduct).then((newProduct) => {
            this.userStore.dispatch(
              addNewProduct({ categoryId, product: newProduct })
            );
          });
        }
      )
    );
  }

  async openEditProductDialog(productId: string) {
    let product = this.userProducts.find((product) => product.id === productId);

    this.productDialogRef = this.dialog.open(ProductDialogComponent, {
      autoFocus: false,
      data: {
        name: product.name,
        description: product.description,
        requestedPrice: product.requestedPrice,
        category: product.category,
        imageFiles: new FileInput(
          await this.getBlobFilesForImagesProducts(
            product.pictureLinks,
            product.name
          )
        ),
      },
    });

    this.productDialogRef.componentInstance.isCreatingMode = false;
    this.subscriptions.push(
      this.productDialogRef.componentInstance.saveProductEvent.subscribe(
        (newProduct) => {
          let categoryId = newProduct.category.id;
          delete newProduct.category;

          this.prepareProductToSave(newProduct).then((newProduct) => {
            this.userStore.dispatch(
              updateProduct({ productId, categoryId, product: newProduct })
            );
          });
        }
      )
    );
  }

  prepareProductToSave(newProduct): Promise<any> {
    newProduct.pictureLinks = [];

    return new Promise((resolve) => {
      let finishedFiles = 0;
      for (let file of newProduct.imageFiles._files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          finishedFiles++;
          newProduct.pictureLinks.push(e.target.result.split(',')[1]);
          if (finishedFiles === newProduct.imageFiles._files.length) {
            delete newProduct.imageFiles;
            resolve(newProduct);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  deleteProduct(productId: string) {
    this.deleteProductDialogRef = this.dialog.open(ConfirmationDialogComponent);

    this.deleteProductDialogRef.componentInstance.title = 'Delete product';
    this.deleteProductDialogRef.componentInstance.content =
      'Are you sure that you want to delete this product?';
    this.subscriptions.push(
      this.deleteProductDialogRef.componentInstance.approveClicked.subscribe(
        () => {
          this.userStore.dispatch(deleteProduct({ productId }));
        }
      )
    );
  }

  getBlobFilesForImagesProducts(
    imagesURLS: Array<string>,
    productName: string
  ): Promise<Array<File>> {
    let special = [
      'zeroth',
      'first',
      'second',
      'third',
      'fourth',
      'fifth',
      'sixth',
      'seventh',
      'eighth',
      'ninth',
      'tenth',
      'eleventh',
      'twelfth',
      'thirteenth',
      'fourteenth',
      'fifteenth',
      'sixteenth',
      'seventeenth',
      'eighteenth',
      'nineteenth',
    ];
    let deca = [
      'twent',
      'thirt',
      'fort',
      'fift',
      'sixt',
      'sevent',
      'eight',
      'ninet',
    ];

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
          files.push(
            new File(
              [request.response],
              `${productName} ${stringifyNumber(finishedFiles)} image`,
              { lastModified: new Date().getTime() }
            )
          );
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
