import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './containers/wishlist/wishlist.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [WishlistComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class WishlistModule { }
