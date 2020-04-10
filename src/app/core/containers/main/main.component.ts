import { Component, OnInit } from '@angular/core';
import { FilteringState } from '../../../features/filter-bar/reducers/filter.reducer';
import { Store } from '@ngrx/store';
import {
  FilterBySearch,
  FilterByPrice,
  FilterByCategory,
  FilterByCity,
} from '../../../features/filter-bar/actions/filter.actions';
import { FilterService } from '../../../features/filter-bar/services/filter/filter.service';

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
}
