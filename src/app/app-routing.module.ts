import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './core/containers/main/main.component';
import { HomeComponent } from './core/containers/home/home.component';
import { LeasingHistoryComponent } from './features/user/leasing-history/containers/leasing-history/leasing-history.component';
import { ProductPageComponent } from './features/product-page/containers/product-page/product-page.component';
import { LoginComponent } from './features/login/containers/login/login.component';
import { SignUpComponent } from './features/sign-up/containers/sign-up/sign-up.component';
import { WishlistComponent } from './features/user/wishlist/containers/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: 'home',
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
        component: ProductPageComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ],
  },
  {
    path: 'user',
    component: MainComponent,
    children: [
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
