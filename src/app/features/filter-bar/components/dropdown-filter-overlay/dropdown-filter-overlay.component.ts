import { Component, OnInit, Inject } from '@angular/core';
import { DROPDOWN_DIALOG_DATA } from '../../consts';
import { Option } from '../../models/options.model';

@Component({
  selector: 'ile-dropdown-filter-overlay',
  templateUrl: './dropdown-filter-overlay.component.html',
  styleUrls: ['./dropdown-filter-overlay.component.less'],
})
export class DropdownFilterOverlayComponent implements OnInit {
  constructor(@Inject(DROPDOWN_DIALOG_DATA) public data: Option[]) {}

  ngOnInit(): void {}
}
