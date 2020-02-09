
import { OnInit, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../auth-types';
import { tap } from 'rxjs/operators';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.login),
        tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
      ),
    { dispatch: false });

  logout$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false });
  constructor(private actions$: Actions, private router: Router) {
  }
}
