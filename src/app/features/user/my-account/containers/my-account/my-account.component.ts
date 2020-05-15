import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLoggedInUser, UserState } from '../../../reducer/user.reducer';
import { User } from '../../../../../core/models/user.model';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmailDialogComponent } from '../../components/email-dialog/email-dialog.component';
import { updateUser, updateUserFailed } from '../../../actions/user.actoins';
import { Actions, ofType } from '@ngrx/effects';
import { PasswordDialogComponent } from '../../components/password-dialog/password-dialog.component';
import { AddressDialogComponent } from '../../components/address-dialog/address-dialog.component';

@Component({
  selector: 'ile-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.less']
})
export class MyAccountComponent implements OnInit, OnDestroy {

  loggedInUser: User;
  subscriptions: Array<Subscription>;
  dialogRef: MatDialogRef<EmailDialogComponent | PasswordDialogComponent | AddressDialogComponent>;

  constructor(private userStore: Store<UserState>, private dialog: MatDialog, private actions$: Actions) {
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;
        if (this.dialogRef) {
          this.dialogRef.close();
          this.dialogRef = null;
        }
      }),
      this.actions$.pipe(
        ofType(updateUserFailed)
      ).subscribe((action) => {
        this.dialogRef.componentInstance.data.errorMessage = action.message;
      })
    ];
  }

  openEmailDialog() {
    this.dialogRef = this.dialog.open(EmailDialogComponent, {
      data: {
        email: this.loggedInUser.email
      },
      autoFocus: false
    });

    this.dialogRef.componentInstance.changeUserEvent.subscribe((newEmail) => {
      this.userStore.dispatch(updateUser({ userId: this.loggedInUser.id, partialUser: { email: newEmail } }));
    });
  }

  openPasswordDialog() {
    this.dialogRef = this.dialog.open(PasswordDialogComponent, {
      autoFocus: false,
      data: {
        password: this.loggedInUser.password
      }
    });

    this.dialogRef.componentInstance.changeUserEvent.subscribe((newPassword) => {
      this.userStore.dispatch(updateUser({ userId: this.loggedInUser.id, partialUser: { password: newPassword } }));
    });
  }

  openAddressDialog() {
    this.dialogRef = this.dialog.open(AddressDialogComponent, {
      autoFocus: false,
      data: {
        zipCode: this.loggedInUser.zipCode,
        street: this.loggedInUser.street,
        city: this.loggedInUser.city,
        country: this.loggedInUser.country
      }
    });

    this.dialogRef.componentInstance.changeUserEvent.subscribe((newAddress) => {
      this.userStore.dispatch(updateUser({ userId: this.loggedInUser.id, partialUser: { ...newAddress } }));
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
