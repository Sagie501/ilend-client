import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'ile-lease-product-display',
  templateUrl: './lease-product-display.component.html',
  styleUrls: ['./lease-product-display.component.less'],
})
export class LeaseProductDisplayComponent implements OnInit {
  user: Partial<User> = {
    firstName: 'Sagie',
    lastName: 'Ivan',
  };

  constructor() {}

  ngOnInit(): void {}
}
