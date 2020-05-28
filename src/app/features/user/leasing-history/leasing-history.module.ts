import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeasingHistoryComponent } from './containers/leasing-history/leasing-history.component';
import { LeaseProductDisplayComponent } from './components/lease-product-display/lease-product-display.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LeasingHistoryComponent, LeaseProductDisplayComponent],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class LeasingHistoryModule {}
