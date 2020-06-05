import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'ile-user-name-circle',
  templateUrl: './user-name-circle.component.html',
  styleUrls: ['./user-name-circle.component.less'],
})
export class UserNameCircleComponent implements OnInit {
  @Input() user: User;
  @Input() showTooltip: boolean = true;
  initials: string;
  userColor: string;

  constructor() {}

  ngOnInit(): void {
    this.initials = this.getInitials().toUpperCase();
    this.userColor = this.getUserColor(
      `${this.user.firstName} ${this.user.lastName}`
    );
  }

  getInitials() {
    return `${this.user.firstName.charAt(0)}${this.user.lastName.charAt(0)}`;
  }

  hashCode(str) {
    // java String#hashCode
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  getUserColor(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }
}
