import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PriceFilter } from '../../reducers/filter.reducer';

@Component({
  selector: 'ile-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.less'],
})
export class FilterBarComponent implements OnInit {
  @Output() searchFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() priceFilter: EventEmitter<PriceFilter> = new EventEmitter<
    PriceFilter
  >();
  @Output() categoryFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() cityFilter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  search(value: string) {
    this.searchFilter.emit(value);
  }
}
