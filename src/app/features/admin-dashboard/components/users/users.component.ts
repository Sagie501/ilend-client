import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ile-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
})
export class UsersComponent implements OnInit {
  titles = [
    'User ID',
    'Full Name',
    'e-mail',
    'Gender',
    'Birth date',
    'Address',
  ];

  data = [
    [
      'b9aaa401-3527-430e-a10a-5cdc600cc2b2',
      'Niv Hindi',
      'nivhindi1@gmail.com',
      'Male',
      new Date(),
      'Alon 16, Ganei Tikva, Israel',
    ],
    [
      'b9aaa401-3527-430e-a10a-5cdc600cc2b2',
      'Niv Hindi',
      'nivhindi1@gmail.com',
      'Male',
      new Date(),
      'Alon 16, Ganei Tikva, Israel',
    ],
    [
      'b9aaa401-3527-430e-a10a-5cdc600cc2b2',
      'Niv Hindi',
      'nivhindi1@gmail.com',
      'Male',
      new Date(),
      'Alon 16, Ganei Tikva, Israel',
    ],
  ];
  funcName = 'Remove';

  constructor() {}

  ngOnInit(): void {}

  removeUser(userDetails: any[]) {
    alert(`${userDetails[0]} User has been removed.`);
  }
}
