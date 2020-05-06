import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './containers/app/app.component';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './containers/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { FilterBarModule } from '../features/filter-bar/filter-bar.module';
import { HomeComponent } from './containers/home/home.component';
import { DataOutletComponent } from './containers/data-outlet/data-outlet.component';
import { LeasingHistoryModule } from '../features/user/leasing-history/leasing-history.module';
import { ProductsListModule } from '../features/products-list/products-list.module';
import { ProductPageModule } from '../features/product-page/product-page.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    HomeComponent,
    DataOutletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FilterBarModule,
    LeasingHistoryModule,
    ProductsListModule,
    ProductPageModule
  ],
  providers: []
})
export class CoreModule {

}
