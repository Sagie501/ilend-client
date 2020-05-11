import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userReducer, userToken } from './reducer/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { LoginModule } from './login/login.module';
import { LeasingHistoryModule } from './leasing-history/leasing-history.module';
import { SignUpModule } from './sign-up/sign-up.module';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(userToken, userReducer),
    EffectsModule.forFeature([UserEffects]),
    CommonModule,
    LoginModule,
    LeasingHistoryModule,
    SignUpModule
  ]
})
export class UserModule { }
