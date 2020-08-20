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
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { AddressDialogComponent } from './components/address-dialog/address-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FavoriteCategoriesDialogComponent } from './components/favorite-categories-dialog/favorite-categories-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { ProfilePictureDialogComponent } from './components/profile-picture-dialog/profile-picture-dialog.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
  declarations: [
    MyAccountComponent,
    EmailDialogComponent,
    PasswordDialogComponent,
    AddressDialogComponent,
    FavoriteCategoriesDialogComponent,
    ProfilePictureDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    RouterModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatAutocompleteModule,
    MaterialFileInputModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
})
export class MyAccountModule {}
