import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { MyErrorStateMatcher } from '../../../../shared/helpers/erroe-state-matcher.helper';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AddressesService } from '../../../../core/services/addresses/addresses.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getLoggedInUser, UserState } from '../../../user/reducer/user.reducer';
import { createNewUser } from '../../../user/actions/user.actoins';
import { Router } from '@angular/router';

@Component({
  selector: 'ile-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription>;
  matcher = new MyErrorStateMatcher();
  countryOptions: Array<string> = [];
  cityOptions: Array<string> = [];
  filteredCountryOptions: Observable<string[]>;
  filteredCityOptions: Observable<string[]>;

  // TODO: Decide which of the fields is really required for the sign up steps - maybe all of them?
  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, this.checkIfMatchingPasswords.bind(this)]),
    birthDate: new FormControl('', [Validators.required]),
    // TODO: Check if this phone pattern good enough
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10,10}$/)]),
    country: new FormControl('', [Validators.required, this.checkIfCountryFromList.bind(this)]),
    city: new FormControl('', [Validators.required, this.checkIfCityFromList.bind(this)]),
    street: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required])
  });

  constructor(private addressesService: AddressesService, private userStore: Store<UserState>, private router: Router) {
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.addressesService.getCountries().subscribe((countries) => {
        this.countryOptions = countries;
      }),
      this.signUpForm.get('country').valueChanges
        .pipe(
          switchMap((countryValue) => {
            if (!this.checkIfValueFromList(countryValue, this.countryOptions)) {
              return this.addressesService.getCitiesByCountries([countryValue]);
            } else {
              return of([] as Array<string>);
            }
          })
        ).subscribe((cities) => {
        this.cityOptions = cities;
      }),
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        if (loggedInUser) {
          this.router.navigateByUrl('/home');
        }
      })
    ];

    this.filteredCountryOptions = this.signUpForm.get('country').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.countryOptions))
      );

    this.filteredCityOptions = this.signUpForm.get('city').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.cityOptions))
      );
  }

  checkIfMatchingPasswords(control: AbstractControl): ValidationErrors | null {
    if (this.signUpForm) {
      let password = this.signUpForm.value.password,
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

  checkIfCountryFromList(control: AbstractControl): ValidationErrors | null {
    return this.checkIfValueFromList(control.value, this.countryOptions);
  }

  checkIfCityFromList(control: AbstractControl): ValidationErrors | null {
    return this.checkIfValueFromList(control.value, this.cityOptions);
  }

  checkIfValueFromList(value: string, list: Array<string>): ValidationErrors | null {
    if (list) {
      if (!list.find((city) => city === value)) {
        return {
          valueNotFromList: true
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  private _filter(value: string, list: Array<string>): string[] {
    const filterValue = value.toLowerCase();

    return list.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    let userInput = { ...this.signUpForm.value };
    delete userInput.confirmPassword;
    this.userStore.dispatch(createNewUser({ user: userInput }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
