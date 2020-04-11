import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  InjectionToken,
  Output,
  EventEmitter,
} from '@angular/core';
import { DropdownFilterOverlayService } from '../../services/overlay/dropdown/dropdown-filter-overlay.service';
import { Option } from '../../models/options.model';
import { DropdownFilter } from '../../models/dropdown-filter.model';

@Component({
  selector: 'ile-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.less'],
})
export class DropdownFilterComponent implements OnInit {
  @Input() title: string;
  @Input() values: Option[];

  @Output() changed: EventEmitter<DropdownFilter> = new EventEmitter();

  @ViewChild('dropdown') dropdown: ElementRef;

  constructor(
    private dropdownFilterOverlayService: DropdownFilterOverlayService
  ) {}

  ngOnInit(): void {}

  openOverlay() {
    this.dropdownFilterOverlayService.open(
      {
        data: this.values,
        callback: (change: DropdownFilter) => this.changed.emit(change),
      },
      this.dropdown
    );
  }
}
