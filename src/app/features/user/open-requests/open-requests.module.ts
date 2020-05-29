import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenRequestsComponent } from './containers/open-requests/open-requests.component';
import { SharedModule } from '../../../shared/shared.module';
import { AppRoutingModule } from '../../../app-routing.module';

@NgModule({
  declarations: [OpenRequestsComponent],
  imports: [CommonModule, SharedModule, AppRoutingModule],
})
export class OpenRequestsModule {}
