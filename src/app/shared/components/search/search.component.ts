import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ile-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  textChanged(value: string) {
    this.search.emit(value);
  }
}
