import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './containers/app/app.component';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './containers/main/main.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './services/user/user.service';
import { FilterService } from './services/filter/filter.service';
import { StoreModule } from '@ngrx/store';
import { filteringToken, filteringReducer } from './reducers/filter.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    FilterBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forFeature(filteringToken, filteringReducer),
    SharedModule,
  ],
  providers: [UserService, FilterService],
})
export class CoreModule {}
