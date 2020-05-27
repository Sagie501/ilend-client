import { Component, Input, OnInit } from '@angular/core';
import { Leasing } from 'src/app/core/models/leasing.model';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'ile-leasings-table',
  templateUrl: './leasings-table.component.html',
  styleUrls: ['./leasings-table.component.less'],
})
export class LeasingsTableComponent implements OnInit {
  @Input() leasings: Leasing[];
  @Input() leasingDirection: 'by' | 'from';

  constructor() {}

  ngOnInit(): void {}
}
