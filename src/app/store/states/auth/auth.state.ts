import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {Auth} from '../../actions/auth/auth.action';
import {AuthService} from '../../../modules/auth/auth.service';
import {catchError, take, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {UserModel} from '../../../models/user/user.model';
import {ErrorResult} from '../../../graphql/results/error.result';
import {JWT_TOKEN_NAME} from '../../../constants';
import {AuthResults} from '../../../graphql/results/auth/auth.results';
import {Navigate} from '@ngxs/router-plugin';
import Login = Auth.Login;
import LoginFailed = Auth.LoginFailed;
import LoginSuccess = Auth.LoginSuccess;
import Logout = Auth.Logout;

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

  constructor(
    private authService: AuthService
  ) {
  }

  @Action(Login)
  login({patchState, dispatch}: StateContext<AuthStateModel>, {payload}: Login): Observable<AuthResults.LoginResult> {
    patchState({
      loading: true
    });
    return this.authService.login(payload).pipe(
      take(1),
      tap((result) => {
        return dispatch(new Auth.LoginSuccess({
          accessToken: result.token,
          user: result.user
        }));
      }),
      catchError((error: ErrorResult) => {
        dispatch(new Auth.LoginFailed(error.map((err) => (err.message))));
        return throwError(error);
      })
    );
  }

  @Action(LoginFailed)
  loginFailed({setState}: StateContext<AuthStateModel>, {errors}: LoginFailed): void {
    localStorage.removeItem(JWT_TOKEN_NAME);
    setState({
      accessToken: null,
      user: null,
      loading: false,
      errors
    });
  }

  @Action(LoginSuccess)
  loginSuccess({setState, dispatch}: StateContext<AuthStateModel>, {payload}: LoginSuccess): void {
    localStorage.setItem(JWT_TOKEN_NAME, payload.accessToken);
    setState({
      accessToken: payload.accessToken,
      user: payload.user,
      loading: false,
      errors: []
    });
    dispatch(new Navigate(['/']));
  }

  @Action(Logout)
  logout({setState, dispatch}: StateContext<AuthStateModel>): void {
    localStorage.removeItem(JWT_TOKEN_NAME);
    setState({
      accessToken: null,
      user: null,
      loading: false,
      errors: []
    });
    dispatch(new Navigate(['/']));
  }
}
