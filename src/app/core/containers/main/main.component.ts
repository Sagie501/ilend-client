import { Component, OnInit } from '@angular/core';
import { FilteringState } from '../../../features/filter-bar/reducers/filter.reducer';
import { Store } from '@ngrx/store';
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
        requestedPrice: 25
      },
      {
        name: 'hijklmn',
        description: 'opqrs',
        requestedPrice: 12.5
      },
      {
        name: 'opqrs',
        description: 'tuvwxyz',
        requestedPrice: 3.333
      },
    ];

    console.log(products);

    filterService.filteringFunction$.subscribe((func) => {
      console.log(products.filter(func));
    });
  }

  ngOnInit(): void {
  }
}
