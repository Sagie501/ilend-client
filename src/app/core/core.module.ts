import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './containers/app/app.component';
import { AppRoutingModule } from '../app-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './containers/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { FilterBarModule } from '../features/filter-bar/filter-bar.module';
import { HomeComponent } from './containers/home/home.component';
import { DataOutletComponent } from './containers/data-outlet/data-outlet.component';
import { AccountPageComponent } from './components/account-page/account-page/account-page.component';
import {MatDividerModule} from '@angular/material/divider';


import { CheckoutModule } from '../features/checkout/checkout.module';
import { LeasingHistoryModule } from '../features/user/leasing-history/leasing-history.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    HomeComponent,
    DataOutletComponent,
    AccountPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FilterBarModule,
    CheckoutModule,
    LeasingHistoryModule,
    MatDividerModule
  ],
  providers: [],
})
export class CoreModule {}
