import { Component, Input, OnInit } from '@angular/core';
import { FilteringState, getCategoryFilterValue, getCityFilterValue, getCountryFilterValue, } from '../../reducers/filter.reducer';
import { DropdownFilter } from '../../models/dropdown-filter.model';
import { Store } from '@ngrx/store';
import { filterByCategory, filterByCity, filterByCountry, filterByPrice, filterBySearch, } from '../../actions/filter.actions';
import { PriceFilter } from '../../models/price-filter.model';
import { Option } from '../../models/options.model';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../../../../core/models/product.model';
import { CategoryService } from '../../../../core/services/category/category.service';
import { Category } from '../../../../core/models/category.model';
import { AddressesService } from '../../../../core/services/addresses/addresses.service';

@Component({
  selector: 'ile-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.less'],
})
export class FilterBarComponent implements OnInit {

  @Input() products: Array<Product>;

  categories$: Observable<Option[]> = combineLatest([
      this.categoryService.getCategories(),
      this.filteringStore.select(getCategoryFilterValue)
    ]
  ).pipe(
    map(([categories, selectedCategories]) => {
      let categoriesOptions: Array<Option> = categories.map((category: Category) => {
        return {
          id: category.id,
          title: category.name,
          amount: this.products.filter((product) => product.categoryId === category.id).length
        } as Option;
      });
      categoriesOptions.forEach((category) => {
        if (selectedCategories) {
          category.isChecked = selectedCategories.includes(category.id);
        } else {
          category.isChecked = false;
        }
      });

      return categoriesOptions;
    })
  );

  countries$: Observable<Option[]> = combineLatest([
      this.addressesService.getCountries(),
      this.filteringStore.select(getCountryFilterValue)
    ]
  ).pipe(
    map(([countries, selectedCities]) => {
      let countriesOptions: Array<Option> = countries.map((country) => {
        return {
          id: country,
          title: country,
          amount: Math.floor(Math.random() * 301) // TODO: Need to add the correct logic
        } as Option;
      });
      countriesOptions.forEach((city) => {
        if (selectedCities) {
          city.isChecked = selectedCities.includes(city.id);
        } else {
          city.isChecked = false;
        }
      });

      return countriesOptions;
    })
  );

  cities$ = this.filteringStore.select(getCountryFilterValue).pipe(
    switchMap((selectedCountries) => {
      if (selectedCountries) {
        return combineLatest([
          this.addressesService.getCitiesByCountries(selectedCountries),
          this.filteringStore.select(getCityFilterValue)
        ]).pipe(
          map(([cities, selectedCities]) => {
            let citiesOptions: Array<Option> = cities.map((city) => {
              return {
                id: city,
                title: city,
                amount: Math.floor(Math.random() * 201) // TODO: Need to add the correct logic
              } as Option;
            });
            citiesOptions.forEach((city) => {
              if (selectedCities) {
                city.isChecked = selectedCities.includes(city.id);
              } else {
                city.isChecked = false;
              }
            });

            return citiesOptions;
          })
        );
      } else {
        return of([]);
      }
    })
  );

  constructor(private filteringStore: Store<FilteringState>, private categoryService: CategoryService,
              private addressesService: AddressesService) {
  }

  ngOnInit(): void {
  }

  search(value: string) {
    this.filteringStore.dispatch(filterBySearch({ value }));
  }

  priceChanged(change: PriceFilter) {
    this.filteringStore.dispatch(filterByPrice(change));
  }

  categoriesChanged(change: DropdownFilter) {
    this.filteringStore.dispatch(filterByCategory({ value: change }));
  }

  countriesChanged(change: DropdownFilter) {
    this.filteringStore.dispatch(filterByCountry({ value: change }));
  }

  citiesChanged(change: DropdownFilter) {
    this.filteringStore.dispatch(filterByCity({ value: change }));
  }
}
