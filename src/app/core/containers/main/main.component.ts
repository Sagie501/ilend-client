import { Component, OnInit } from '@angular/core';
import { FilteringState } from '../../reducers/filter.reducer';
import { Store } from '@ngrx/store';
import {
  FilterBySearch,
  FilterByPrice,
  FilterByCategory,
  FilterByCity,
} from '../../actions/filter.actions';
import { FilterService } from '../../services/filter/filter.service';

@Component({
  selector: 'ile-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnInit {
  constructor(
    private filteringStore: Store<FilteringState>,
    private filterService: FilterService
  ) {
    let products = [
      {
        name: 'abcdefg',
        description: 'hijklmn',
        requestedPrice: 25,
        categoryID: '1',
        userID: '1',
      },
      {
        name: 'hijklmn',
        description: 'opqrs',
        requestedPrice: 12.5,
        categoryID: '2',
        userID: '1',
      },
      {
        name: 'opqrs',
        description: 'tuvwxyz',
        requestedPrice: 3.333,
        categoryID: '3',
        userID: '1',
      },
    ];

    console.log(products);

    filterService.filteringFunction$.subscribe((func) => {
      console.log(products.filter(func));
    });
  }

  ngOnInit(): void {}

  filterBySearch(value: string) {
    this.filteringStore.dispatch(new FilterBySearch({ value }));
  }

  filterByPrice(from: number, to: number) {
    if (from && to) {
      this.filteringStore.dispatch(new FilterByPrice({ from, to }));
    }
  }

  filterByCategory(value: string) {
    this.filteringStore.dispatch(new FilterByCategory({ value }));
  }

  filterByCity(value: string) {
    this.filteringStore.dispatch(new FilterByCity({ value }));
  }
}
