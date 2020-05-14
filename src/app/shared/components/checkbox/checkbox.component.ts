import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropdownFilter } from 'src/app/features/filter-bar/models/dropdown-filter.model';

@Component({
  selector: 'ile-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less'],
})
export class CheckboxComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() id: string;

  @Output() changed: EventEmitter<DropdownFilter> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onChanged() {
    this.changed.emit({ id: this.id, isChecked: !this.isChecked });
  }
}
