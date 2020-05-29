import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeasingHistoryComponent } from './containers/leasing-history/leasing-history.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LeasingHistoryComponent],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class LeasingHistoryModule {}
