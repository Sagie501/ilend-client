import { Component, OnInit } from '@angular/core';
import { FilteringState, getCategoryFilterValue, getCityFilterValue, } from '../../reducers/filter.reducer';
import { DropdownFilter } from '../../models/dropdown-filter.model';
import { Store } from '@ngrx/store';
import { filterByCategory, filterByCity, filterByPrice, filterBySearch, } from '../../actions/filter.actions';
import { PriceFilter } from '../../models/price-filter.model';
import { Option } from '../../models/options.model';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ile-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.less'],
})
export class FilterBarComponent implements OnInit {
  // TODO: Remove this when DB is connected
  categories: Option[] = [
    {
      id: '1',
      isChecked: false,
      title: 'hello',
      amount: 23,
    },
    {
      id: '2',
      isChecked: false,
      title: 'world',
      amount: 12,
    },
    {
      id: '3',
      isChecked: false,
      title: 'what',
      amount: 5,
    },
    {
      id: '4',
      isChecked: false,
      title: 'ciao',
    },
  ];

  cities: Option[] = [
    {
      id: 'Rehovot',
      isChecked: false,
      title: 'Rehovot',
      amount: 345,
    },
    {
      id: 'Netanya',
      isChecked: false,
      title: 'Netanya',
      amount: 1,
    },
    {
      id: 'Pardesiya',
      isChecked: false,
      title: 'Pardesiya',
    },
    {
      id: 'Holon',
      isChecked: false,
      title: 'Holon',
    },
    {
      id: 'Rishon LeTsion',
      isChecked: false,
      title: 'Rishon LeTsion',
    },
    {
      id: 'Tel Aviv',
      isChecked: false,
      title: 'Tel Aviv',
    },
    {
      id: 'New York',
      isChecked: false,
      title: 'New York',
    },
    {
      id: 'Barcelona',
      isChecked: false,
      title: 'Barcelona',
    },
  ];

  categories$: Observable<Option[]> = combineLatest([
      of(this.categories),
      this.filteringStore.select(getCategoryFilterValue)
    ]
  ).pipe(
    map(([categories, selectedCategories]) => {
      categories.forEach((category) => {
        if (selectedCategories) {
          category.isChecked = selectedCategories.includes(category.id);
        } else {
          category.isChecked = false;
        }
      });

      return categories;
    })
  );

  cities$: Observable<Option[]> = combineLatest(
    of(this.cities),
    this.filteringStore.select(getCityFilterValue)
  ).pipe(
    map(([cities, selectedCities]) => {
      cities.forEach((city) => {
        if (selectedCities) {
          city.isChecked = selectedCities.includes(city.id);
        } else {
          city.isChecked = false;
        }
      });

      return cities;
    })
  );

  constructor(private filteringStore: Store<FilteringState>) {
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

  citiesChanged(change: DropdownFilter) {
    this.filteringStore.dispatch(filterByCity({ value: change }));
  }
}
