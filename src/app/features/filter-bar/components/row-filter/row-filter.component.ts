import { Component, OnInit, Input } from '@angular/core';
import { Option } from '../../models/options.model';

@Component({
  selector: 'ile-row-filter',
  templateUrl: './row-filter.component.html',
  styleUrls: ['./row-filter.component.less'],
})
export class RowFilterComponent implements OnInit {
  @Input() option: Option;

  constructor() {}

  ngOnInit(): void {}
}
