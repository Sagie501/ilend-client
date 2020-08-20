import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Leasing } from 'src/app/core/models/leasing.model';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

@Component({
  selector: 'ile-all-leasings',
  templateUrl: './all-leasings.component.html',
  styleUrls: ['./all-leasings.component.less'],
})
export class AllLeasingsComponent implements OnInit {
  @Input() leasings: Leasing[];

  titles = [
    'Leasing ID',
    'Lessee ID',
    'Lessee Name',
    'Lessor ID',
    'Lessor Name',
    'Product ID',
    'Product Name',
    'Start Date',
    'End Date',
    'Status',
  ];

  constructor() {}

  ngOnInit(): void {}

  isDate(value: any) {
    return value instanceof Date;
  }

  isStatus(title: string) {
    return title.toLowerCase() === 'status';
  }
}
