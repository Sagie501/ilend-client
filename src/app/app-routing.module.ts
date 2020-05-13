import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/containers/main/main.component';
import { HomeComponent } from './core/containers/home/home.component';
import { CheckoutComponent } from './features/checkout/containers/checkout/checkout.component';
import { LeasingHistoryComponent } from './features/user/leasing-history/containers/leasing-history/leasing-history.component';
import { ProductPageComponent } from './features/product-page/containers/product-page/product-page.component';
import { LoginComponent } from './features/login/containers/login/login.component';
import { SignUpComponent } from './features/sign-up/containers/sign-up/sign-up.component';
import { WishlistComponent } from './features/user/wishlist/containers/wishlist/wishlist.component';
import { AuthGuard } from './core/services/auth-guard/auth.guard';
import { MyAccountComponent } from './features/user/my-account/containers/my-account/my-account.component';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: '/home/products',
    pathMatch: 'full',
  },
  {
    path: 'user',
    redirectTo: '/home/products',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: MainComponent,
    children: [
      {
        path: 'products',
        component: HomeComponent,
      },
      {
        path: 'products/:id',
        component: ProductPageComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      }
    ],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'my-account',
        component: MyAccountComponent,
      },
      {
        path: 'leasing-history',
        component: LeasingHistoryComponent,
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      }
    ],
  },
  {
    path: '',
    redirectTo: '/home/products',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home/products',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
