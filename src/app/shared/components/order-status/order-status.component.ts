import { Component, OnInit, Input } from '@angular/core';
import {
  getStatusForClient,
  getStatusColor,
} from '../../helpers/order-status.helper';

@Component({
  selector: 'ile-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.less'],
})
export class OrderStatusComponent implements OnInit {
  @Input() status: string;
  statusText: string;
  statusColor: string;

  constructor() {}

  ngOnInit(): void {
    this.statusText = getStatusForClient(this.status);
    this.statusColor = getStatusColor(this.status);
    console.log(this.statusColor);
  }
}
