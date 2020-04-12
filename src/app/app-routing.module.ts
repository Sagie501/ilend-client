import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './core/containers/main/main.component';
import { HomeComponent } from './core/containers/home/home.component';
import { LeasingHistoryComponent } from './features/user/leasing-history/containers/leasing-history/leasing-history.component';

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
export class AppRoutingModule {}
