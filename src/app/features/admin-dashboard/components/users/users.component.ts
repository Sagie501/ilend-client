import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'ile-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
})
export class UsersComponent implements OnInit {
  @Input() users: User[];

  titles = [
    'User ID',
    'Full Name',
    'e-mail',
    'Gender',
    'Birth date',
    'Address',
  ];

  funcName = 'Remove';

  constructor() {}

  ngOnInit(): void {}

  removeUser(userDetails: any[]) {
    alert(`${userDetails[0]} User has been removed.`);
  }
}
