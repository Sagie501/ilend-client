import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OngoingLeasingsComponent } from './containers/ongoing-leasings/ongoing-leasings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OngoingLeasingsComponent],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class OngoingLeasingsModule {}
