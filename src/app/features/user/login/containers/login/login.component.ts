import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../../../../core/models/user.model';
import { login } from '../../../actions/user.actoins';
import { MyErrorStateMatcher } from '../../../../../shared/helpers/erroe-state-matcher.helper';
import { getLoggedInUser } from '../../../reducer/user.reducer';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ile-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription>;
  matcher = new MyErrorStateMatcher();
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private userStore: Store<User>, private router: Router) {
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        if (loggedInUser) {
          this.router.navigateByUrl('/home');
        }
      })
    ];
  }

  onSubmit() {
    this.userStore.dispatch(login({ email: this.loginForm.value.email, password: this.loginForm.value.password }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
