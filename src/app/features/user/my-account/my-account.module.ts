import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './containers/my-account/my-account.component';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    RouterModule
  ]
})
export class MyAccountModule { }
