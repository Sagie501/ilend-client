import { Component, OnInit } from '@angular/core';
import { LeasingService } from 'src/app/core/services/leasing/leasing.service';
import { Leasing } from 'src/app/core/models/leasing.model';

@Component({
  selector: 'ile-leasing-history',
  templateUrl: './leasing-history.component.html',
  styleUrls: ['./leasing-history.component.less'],
})
export class LeasingHistoryComponent implements OnInit {
  pendingLeasings: Leasing[];

  constructor(private leasingService: LeasingService) {
    this.pendingLeasings = this.leasingService.getPendingLeasings();
  }

  ngOnInit(): void {
  }
}
