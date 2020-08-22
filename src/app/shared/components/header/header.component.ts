import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToggleTheme } from 'src/app/core/actions/layout.actions';
import { getCurrentTheme, Theme } from 'src/app/core/reducers/layout.reducer';

@Component({
  selector: 'ile-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  themes;
  constructor(private store: Store) {
    this.themes = Theme;
  }

  theme$ = this.store.select(getCurrentTheme);

  ngOnInit(): void {}

  toggleTheme() {
    this.store.dispatch(ToggleTheme());
  }
}
