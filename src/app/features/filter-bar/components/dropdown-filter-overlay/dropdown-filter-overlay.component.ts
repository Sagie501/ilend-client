import { Component, OnInit, Inject } from '@angular/core';
import { DROPDOWN_DIALOG_DATA, DROPDOWN_DIALOG_CALLBACK } from '../../consts';
import { Option } from '../../models/options.model';
import { Store } from '@ngrx/store';
import { FilteringState } from '../../reducers/filter.reducer';
import { DropdownFilter } from '../../models/dropdown-filter.model';

@Component({
  selector: 'ile-dropdown-filter-overlay',
  templateUrl: './dropdown-filter-overlay.component.html',
  styleUrls: ['./dropdown-filter-overlay.component.less'],
})
export class DropdownFilterOverlayComponent implements OnInit {
  constructor(
    @Inject(DROPDOWN_DIALOG_DATA) public data: Option[],
    @Inject(DROPDOWN_DIALOG_CALLBACK)
    public callback: (change: DropdownFilter) => void
  ) {}

  ngOnInit(): void {}
}
