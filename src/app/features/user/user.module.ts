import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userReducer, userToken } from './reducer/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { LeasingHistoryModule } from './leasing-history/leasing-history.module';
import { WishlistModule } from './wishlist/wishlist.module';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(userToken, userReducer),
    EffectsModule.forFeature([UserEffects]),
    CommonModule,
    LeasingHistoryModule,
    WishlistModule
  ]
})
export class UserModule { }
