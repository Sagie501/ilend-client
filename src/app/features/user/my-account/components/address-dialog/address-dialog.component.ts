import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { MyErrorStateMatcher } from '../../../../../shared/helpers/error-state-matcher.helper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { AddressesService } from '../../../../../core/services/addresses/addresses.service';

@Component({
  selector: 'ile-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.less']
})
export class AddressDialogComponent implements OnInit, OnDestroy {

  addressFormGroup: FormGroup = new FormGroup({
    country: new FormControl(this.data.country, [Validators.required, this.checkIfCountryFromList.bind(this)]),
    city: new FormControl(this.data.city, [Validators.required, this.checkIfCityFromList.bind(this)]),
    street: new FormControl(this.data.street, [Validators.required]),
    zipCode: new FormControl(this.data.zipCode, [Validators.required]),
  });
  countryOptions: Array<string> = [];
  cityOptions: Array<string> = [];
  filteredCountryOptions: Observable<string[]>;
  filteredCityOptions: Observable<string[]>;
  matcher = new MyErrorStateMatcher();
  subscriptions: Array<Subscription>;
  @Output() changeUserEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(@Inject(MAT_DIALOG_DATA) public data:
                { zipCode: string, street: string, city: string, country: string, errorMessage: string },
              private addressesService: AddressesService) {
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.addressesService.getCountries().subscribe((countries) => {
        this.countryOptions = countries;
        this.addressFormGroup.get('country').updateValueAndValidity();
      }),
      this.addressFormGroup.get('country').valueChanges
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
        this.addressFormGroup.get('city').updateValueAndValidity();
      })
    ];

    this.filteredCountryOptions = this.addressFormGroup.get('country').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.countryOptions))
      );

    this.filteredCityOptions = this.addressFormGroup.get('city').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.cityOptions))
      );
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
