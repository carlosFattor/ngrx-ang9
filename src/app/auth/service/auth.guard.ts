import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { isLoggedIn } from '../selectors/auth-selectors';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs/internal/Observable';
import { noop } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store
      .pipe(
        select(isLoggedIn),
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigateByUrl('/')
          }
        })
      );
  }
}
