import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './containers/my-account/my-account.component';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { EmailDialogComponent } from './components/email-dialog/email-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [MyAccountComponent, EmailDialogComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    RouterModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class MyAccountModule { }
