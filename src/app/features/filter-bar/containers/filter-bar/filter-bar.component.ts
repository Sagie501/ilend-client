import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FilteringState,
  getCategoryFilterValue,
} from '../../reducers/filter.reducer';
import { DropdownFilter } from '../../models/dropdown-filter.model';
import { Store } from '@ngrx/store';
import {
  FilterByCategory,
  FilterBySearch,
  FilterByCity,
  FilterByPrice,
} from '../../actions/filter.actions';
import { PriceFilter } from '../../models/price-filter.model';
import { Category } from 'src/app/core/models/category.model';
import { Option } from '../../models/options.model';
import { combineLatest, of, Observable } from 'rxjs';
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

  categories$: Observable<Option[]> = combineLatest(
    of(this.categories),
    this.filteringStore.select(getCategoryFilterValue)
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

  constructor(private filteringStore: Store<FilteringState>) {}

  ngOnInit(): void {}

  search(value: string) {
    this.filteringStore.dispatch(new FilterBySearch({ value }));
  }

  priceChanged(change: PriceFilter) {
    this.filteringStore.dispatch(new FilterByPrice(change));
  }

  categoriesChanged(change: DropdownFilter) {
    this.filteringStore.dispatch(new FilterByCategory({ value: change }));
  }

  citiesChanged(change: DropdownFilter) {
    this.filteringStore.dispatch(new FilterByCity({ value: change }));
  }
}
