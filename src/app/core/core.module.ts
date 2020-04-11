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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, FilterBarModule],
  providers: [UserService],
})
export class CoreModule {}
