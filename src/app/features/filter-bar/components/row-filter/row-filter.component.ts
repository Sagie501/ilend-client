import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Option } from '../../models/options.model';
import { DropdownFilter } from '../../models/dropdown-filter.model';

@Component({
  selector: 'ile-row-filter',
  templateUrl: './row-filter.component.html',
  styleUrls: ['./row-filter.component.less'],
})
export class RowFilterComponent implements OnInit {
  @Input() option: Option;

  @Output() changed: EventEmitter<DropdownFilter> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }
}
