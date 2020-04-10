import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  InjectionToken,
} from '@angular/core';
import { DropdownFilterOverlayService } from '../../services/overlay/dropdown-filter-overlay.service';
import { Option } from '../../models/options.model';

@Component({
  selector: 'ile-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.less'],
})
export class DropdownFilterComponent implements OnInit {
  @Input() title: string;
  @Input() data: Option[];

  @ViewChild('dropdown') dropdown: ElementRef;

  constructor(
    private dropdownFilterOverlayService: DropdownFilterOverlayService
  ) {}

  ngOnInit(): void {}

  openOverlay() {
    this.dropdownFilterOverlayService.open(
      {
        data: [
          {
            id: '1',
            title: 'German',
            isChecked: true,
            amount: 23,
          },
          {
            id: '1',
            title: 'English',
            isChecked: false,
            amount: 12,
          },
          {
            id: '1',
            title: 'Italian',
            isChecked: false,
            amount: 5,
          },
          {
            id: '1',
            title: 'French',
            isChecked: true,
          },
        ],
      },
      this.dropdown
    );
  }
}
