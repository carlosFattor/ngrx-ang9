import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppState } from './reducers';
import { AuthActions } from './auth/auth-types';
import { isLoggedIn, isLoggedOut } from './auth/selectors/auth-selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;
  isLogin$: Observable<boolean>;
  isLogout$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {

    const userProfile = localStorage.getItem('user');
    if (!!userProfile) {
      this.store.dispatch(AuthActions.login({ user: JSON.parse(localStorage.getItem('user')) }));
    }

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.isLogin$ = this.store
      .pipe(
        select(isLoggedIn)
      );

    this.isLogout$ = this.store
      .pipe(
        select(isLoggedOut)
      );
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

}
