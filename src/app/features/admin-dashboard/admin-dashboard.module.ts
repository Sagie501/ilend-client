import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './containers/admin-dashboard/admin-dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { OverviewComponent } from './components/overview/overview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './components/users/users.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [AdminDashboardComponent, OverviewComponent, UsersComponent],
  imports: [CommonModule, MatTabsModule, MatSnackBarModule, SharedModule],
})
export class AdminDashboardModule {}
