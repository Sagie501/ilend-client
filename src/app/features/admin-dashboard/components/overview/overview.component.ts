import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ile-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less'],
})
export class OverviewComponent implements OnInit {
  titles = [
    'Product name',
    'Lessee',
    'Lessor',
    'Start date',
    'End date',
    'Card number',
    'Amount',
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

  earnings = [20, 35, 18.3, 42, 10.25, 73.215, 53];
  @Input() leasingsPerDay: number[];

  constructor() {}

  ngOnInit(): void {}
}
