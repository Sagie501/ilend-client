import { Component, Input, OnInit } from '@angular/core';
import { FilteringState, getCategoryFilterValue, getCityFilterValue, } from '../../reducers/filter.reducer';
import { DropdownFilter } from '../../models/dropdown-filter.model';
import { Store } from '@ngrx/store';
import { filterByCategory, filterByCity, filterByPrice, filterBySearch, } from '../../actions/filter.actions';
import { PriceFilter } from '../../models/price-filter.model';
import { Option } from '../../models/options.model';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../../../core/models/product.model';
import { CategoryService } from '../../../../core/services/category/category.service';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'ile-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.less'],
})
export class FilterBarComponent implements OnInit {
  // TODO: Remove this when DB is connected

  @Input() products: Array<Product> = [];

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

  cities$: Observable<Option[]> = combineLatest([
      of(this.cities),
      this.filteringStore.select(getCityFilterValue)
    ]
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

  constructor(private filteringStore: Store<FilteringState>, private categoryService: CategoryService) {
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
