import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './containers/app/app.component';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './containers/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './services/user/user.service';
import { FilterBarModule } from '../features/filter-bar/filter-bar.module';
import { HomeComponent } from './containers/home/home.component';
import { DataOutletComponent } from './containers/data-outlet/data-outlet.component';
import { AccountPageComponent } from './components/account-page/account-page/account-page.component';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    HomeComponent,
    DataOutletComponent,
    AccountPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, FilterBarModule, MatDividerModule],
  providers: [UserService],
})
export class CoreModule {}
