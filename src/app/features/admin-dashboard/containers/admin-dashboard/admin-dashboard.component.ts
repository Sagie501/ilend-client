import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user/user.service';
import { User } from '../../../../core/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

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

  removeUser(userId: string) {
    this.userService.removeUser(userId).subscribe((succeed) => {
      this.snackBar.open(
        succeed
          ? 'User removed successfully'
          : 'User could not be removed right now',
        'OK',
        {
          duration: 3000,
        }
      );
    });
  }
}
