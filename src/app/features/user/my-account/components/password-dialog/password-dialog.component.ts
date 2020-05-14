import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../../../shared/helpers/error-state-matcher.helper';

@Component({
  selector: 'ile-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.less']
})
export class PasswordDialogComponent implements OnInit {

  passwordFormGroup: FormGroup = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, this.checkIfCurrentPasswordMatch.bind(this)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmNewPassword: new FormControl('', [Validators.required, this.checkIfMatchingPasswords.bind(this)]),
  });
  matcher = new MyErrorStateMatcher();
  @Output() changePasswordEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { password: string, errorMessage: string }) { }

  ngOnInit(): void {
  }

  checkIfCurrentPasswordMatch(control: AbstractControl): ValidationErrors | null {
    let password = control.value;
    if (password !== this.data.password) {
      return {
        mismatchPasswords: true
      };
    } else {
      return null;
    }
  }

  checkIfMatchingPasswords(control: AbstractControl): ValidationErrors | null {
    if (this.passwordFormGroup) {
      let password = this.passwordFormGroup.value.newPassword,
        confirmPassword = control.value;
      if (password !== confirmPassword) {
        return {
          mismatchPasswords: true
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
