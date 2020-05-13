import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Leasing } from 'src/app/core/models/leasing.model';
import { LeasingStatusFromServer } from '../../../../../shared/helpers/order-status.helper';

@Component({
  selector: 'ile-lease-product-display',
  templateUrl: './lease-product-display.component.html',
  styleUrls: ['./lease-product-display.component.less'],
})
export class LeaseProductDisplayComponent implements OnInit {

  @Input() leasing: Leasing;
  @Output() changeLeasingRequestStatus: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  cancelLeasingRequest() {
    this.changeLeasingRequestStatus.emit({ leasingId: this.leasing.id, status: LeasingStatusFromServer.DENIED });
  }
}
