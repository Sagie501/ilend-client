import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeasingHistoryComponent } from './containers/leasing-history/leasing-history.component';
import { LeaseProductDisplayComponent } from './components/lease-product-display/lease-product-display.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeasingsTableComponent } from './components/leasings-table/leasings-table.component';

@NgModule({
  declarations: [LeasingHistoryComponent, LeaseProductDisplayComponent, LeasingsTableComponent],
  imports: [CommonModule, SharedModule],
})
export class LeasingHistoryModule {}
