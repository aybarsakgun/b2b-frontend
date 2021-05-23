import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {Auth} from '../../actions/auth/auth.action';
import {AuthService} from '../../../modules/auth/auth.service';
import {catchError, take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserModel} from '../../../models/user/user.model';
import {ErrorResult} from '../../../graphql/results/error.result';
import {JWT_TOKEN_NAME} from '../../../constants';
import {AuthResults} from '../../../graphql/results/auth/auth.results';
import {Navigate} from '@ngxs/router-plugin';

export interface AuthStateModel {
  accessToken: string;
  user: UserModel;
  loading: boolean;
  errors: string[];
}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('auth');

@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    accessToken: localStorage.getItem(JWT_TOKEN_NAME),
    user: null,
    loading: false,
    errors: []
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static isLoading(state: AuthStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.accessToken && state.user && !state.errors.length;
  }

  @Selector()
  static errors(state: AuthStateModel): string[] {
    return state.errors;
  }

  constructor(
    private authService: AuthService
  ) {
  }

  @Action(Auth.Login)
  login({patchState, dispatch}: StateContext<AuthStateModel>, {payload}: Auth.Login): Observable<AuthResults.LoginResult | void> {
    patchState({
      loading: true
    });
    return this.authService.login(payload).pipe(
      take(1),
      tap((result) => {
        return dispatch([new Auth.LoginSuccess({
          accessToken: result.token,
          user: result.user
        }), new Navigate(['/'])]);
      }),
      catchError((error: ErrorResult) => {
        return dispatch(new Auth.LoginFailed(error.map((err) => (err.message))));
      })
    );
  }

  @Action(Auth.LoginFailed)
  loginFailed({setState}: StateContext<AuthStateModel>, {errors}: Auth.LoginFailed): void {
    localStorage.removeItem(JWT_TOKEN_NAME);
    setState({
      accessToken: null,
      user: null,
      loading: false,
      errors
    });
  }

  @Action(Auth.LoginSuccess)
  loginSuccess({setState}: StateContext<AuthStateModel>, {payload}: Auth.LoginSuccess): void {
    localStorage.setItem(JWT_TOKEN_NAME, payload.accessToken);
    setState({
      accessToken: payload.accessToken,
      user: payload.user,
      loading: false,
      errors: []
    });
  }

  @Action(Auth.Logout)
  logout({setState}: StateContext<AuthStateModel>): void {
    localStorage.removeItem(JWT_TOKEN_NAME);
    setState({
      accessToken: null,
      user: null,
      loading: false,
      errors: []
    });
  }

  @Action(Auth.CurrentUser)
  currentUser({dispatch, patchState}: StateContext<AuthStateModel>): Observable<AuthResults.CurrentUserResult | void> {
    patchState({
      loading: true
    });
    return this.authService.currentUser().pipe(
      take(1),
      tap((result) => {
        patchState({
          user: result,
          loading: false,
          errors: []
        });
      }),
      catchError((error: ErrorResult) => {
        return dispatch(new Auth.LoginFailed(error.map((err) => (err.message))));
      })
    );
  }
}
