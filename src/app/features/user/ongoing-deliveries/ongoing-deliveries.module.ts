import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OngoingDeliveriesComponent } from './containers/ongoing-deliveries/ongoing-deliveries.component';
import { SharedModule } from '../../../../app/shared/shared.module';
import { AppRoutingModule } from '../../../app-routing.module';
import {MatStepperModule} from '@angular/material/stepper';
import { LayoutModule } from '@progress/kendo-angular-layout';


@NgModule({
  declarations: [OngoingDeliveriesComponent],
  imports: [CommonModule, SharedModule, AppRoutingModule, MatStepperModule, LayoutModule],
})
export class OngoingDeliveriesModule {}
