import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Leasing } from 'src/app/core/models/leasing.model';
import { User } from 'src/app/core/models/user.model';
import { LeasingStatusFromServer } from '../../helpers/order-status.helper';

@Component({
  selector: 'ile-lease-product-display',
  templateUrl: './lease-product-display.component.html',
  styleUrls: ['./lease-product-display.component.less'],
})
export class LeaseProductDisplayComponent implements OnInit {
  @Input() leasing: Leasing;
  @Input() user: User;
  @Input() isLessor: boolean = false;
  @Output() changeLeasingRequestStatus: EventEmitter<any> = new EventEmitter<
    any
  >();

  constructor() {}

  ngOnInit(): void {}

  cancelLeasingRequest() {
    this.changeLeasingRequestStatus.emit({
      leasingId: this.leasing.id,
      status: LeasingStatusFromServer.DENIED,
    });
  }

  approveLeasingRequest() {
    this.changeLeasingRequestStatus.emit({
      leasingId: this.leasing.id,
      status: LeasingStatusFromServer.IN_DELIVERY,
    });
  }
}
