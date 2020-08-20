import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  LayoutState,
  getCurrentTheme,
  Theme,
} from '../../reducers/layout.reducer';
import { map, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[];

  constructor(private store: Store<LayoutState>) {}

  ngOnInit() {
    this.subscriptions = [
      this.store
        .select(getCurrentTheme)
        .pipe(
          map((theme) => {
            return `theme-${theme}`;
          }),
          tap((theme) => {
            let body = document.getElementsByTagName('body')[0];
            body.className = theme;
          })
        )
        .subscribe(),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
