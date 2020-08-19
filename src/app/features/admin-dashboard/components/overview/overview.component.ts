import { Component, OnInit, Input } from '@angular/core';
import { Leasing } from 'src/app/core/models/leasing.model';

@Component({
  selector: 'ile-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less'],
})
export class OverviewComponent implements OnInit {
  titles = [
    'Leasing ID',
    'Lessee Name',
    'Lessor Name',
    'Product ID',
    'Product Name',
    'Start Date',
    'Transaction ID',
    'Toal Price',
  ];

  data = [
    [
      'Ski equipment',
      'Niv Hindi',
      'Sagie Ivan',
      new Date(),
      new Date(),
      '**** **** **** 0215',
      '$25',
    ],
    [
      'Ski equipment',
      'Niv Hindi',
      'Sagie Ivan',
      new Date(),
      new Date(),
      '**** **** **** 0215',
      '$25',
    ],
    [
      'Ski equipment',
      'Niv Hindi',
      'Sagie Ivan',
      new Date(),
      new Date(),
      '**** **** **** 0215',
      '$25',
    ],
    [
      'Ski equipment',
      'Niv Hindi',
      'Sagie Ivan',
      new Date(),
      new Date(),
      '**** **** **** 0215',
      '$25',
    ],
    [
      'Ski equipment',
      'Niv Hindi',
      'Sagie Ivan',
      new Date(),
      new Date(),
      '**** **** **** 0215',
      '$25',
    ],
    [
      'Ski equipment',
      'Niv Hindi',
      'Sagie Ivan',
      new Date(),
      new Date(),
      '**** **** **** 0215',
      '$25',
    ],
  ];

  @Input() earningsPerDay: number[];
  @Input() leasingsPerDay: number[];
  @Input() latestTransactions: Leasing[];

  constructor() {}

  ngOnInit(): void {}
}
