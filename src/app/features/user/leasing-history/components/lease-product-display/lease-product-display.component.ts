import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Leasing } from 'src/app/core/models/leasing.model';

@Component({
  selector: 'ile-lease-product-display',
  templateUrl: './lease-product-display.component.html',
  styleUrls: ['./lease-product-display.component.less'],
})
export class LeaseProductDisplayComponent implements OnInit {
  @Input() leasing: Leasing;

  constructor() {}

  ngOnInit(): void {}
}
