import { Component, Input, OnInit } from '@angular/core';
import { Leasing } from 'src/app/core/models/leasing.model';
import { User } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ile-leasings-table',
  templateUrl: './leasings-table.component.html',
  styleUrls: ['./leasings-table.component.less'],
})
export class LeasingsTableComponent implements OnInit {
  @Input() leasings: Leasing[];
  @Input() leasingDirection: 'by' | 'from';
  @Input() isInDelivery: boolean;
  currentLeasingOpen: string;

  public currentLeasingOpenStatusNumber = 1;

  public steps = [
      { label: 'In transit', icon: 'user' , disabled: true},
      { label: 'Local warehouse', icon: 'home' , disabled: true},
      { label: 'Dispatched local warehouse', icon: 'user' ,disabled: true },
      { label: 'Arrived! :)', icon: 'user', disabled: true }
  ];

  constructor() {}

  ngOnInit(): void {}

  openDeliveryStatusGraph(leasingToBeOpened: string, deliveryStatus: string) {
    if (this.currentLeasingOpen === leasingToBeOpened) {
      this.currentLeasingOpen = undefined;
    } else {
      this.currentLeasingOpen = leasingToBeOpened;
      this.currentLeasingOpenStatusNumber = deliveryStatus === "IN_TRANSIT" ? 0 : "ARRIVED_IN_LOCAL_WAREHOUSE" ? 1 : deliveryStatus === "DISPATCHING_FROM_LOCAL_WAREHOUSE" ? 2 : 3;
    }
  }
}
