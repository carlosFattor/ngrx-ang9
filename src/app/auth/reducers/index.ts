import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { User } from '../model/user.model';
import { AuthActions } from '../auth-types';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined
}

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      user: action.user
    };
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined
    };
  })
);
