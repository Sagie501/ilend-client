import { Component, OnInit } from '@angular/core';
import { Leasing } from 'src/app/core/models/leasing.model';
import { LeasingService } from 'src/app/core/services/leasing/leasing.service';

@Component({
  selector: 'ile-leasings-table',
  templateUrl: './leasings-table.component.html',
  styleUrls: ['./leasings-table.component.less'],
})
export class LeasingsTableComponent implements OnInit {
  leasings: Leasing[];

  constructor(private leasingService: LeasingService) {
    this.leasings = this.leasingService.getLeasings();
  }

  ngOnInit(): void {}
}
