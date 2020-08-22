import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userReducer, userToken } from './reducer/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { LeasingHistoryModule } from './leasing-history/leasing-history.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { MyAccountModule } from './my-account/my-account.module';
import { MyProductsModule } from './my-products/my-products.module';
import { OngoingLeasingsModule } from './ongoing-leasings/ongoing-leasings.module';
import { OngoingDeliveriesModule } from './ongoing-deliveries/ongoing-deliveries.module';
import { OpenRequestsModule } from './open-requests/open-requests.module';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(userToken, userReducer),
    EffectsModule.forFeature([UserEffects]),
    CommonModule,
    LeasingHistoryModule,
    OngoingLeasingsModule,
    OngoingDeliveriesModule,
    OpenRequestsModule,
    WishlistModule,
    MyAccountModule,
    MyProductsModule
  ],
})
export class UserModule {}
