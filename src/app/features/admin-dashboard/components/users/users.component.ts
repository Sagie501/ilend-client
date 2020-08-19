import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'ile-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
})
export class UsersComponent implements OnInit {
  @Input() users: User[];

  @Output() removeUserFunc: EventEmitter<void> = new EventEmitter<void>();

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
    this.removeUserFunc.emit(userDetails[0]);
  }
}
