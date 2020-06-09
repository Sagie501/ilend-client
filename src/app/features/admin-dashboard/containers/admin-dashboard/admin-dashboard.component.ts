import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user/user.service';
import { User } from '../../../../core/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ile-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.less'],
})
export class AdminDashboardComponent implements OnInit {
  allUsers$: Observable<any[]> = this.userService.getAllUsers().pipe(
    map((users: User[]) => {
      return users.map(this.mapUserForDashboard);
    })
  );

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  mapUserForDashboard(user: User) {
    return [
      user.id,
      [user.firstName, user.lastName].join(' '),
      user.email,
      user.gender,
      new Date(user.birthDate),
      [user.street, user.city, user.country].join(', '),
    ];
  }
}
