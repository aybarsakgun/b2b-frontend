import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {Auth} from '../../actions/auth/auth.action';
import Login = Auth.Login;
import {AuthService} from '../../../modules/auth/auth.service';
import {catchError, startWith, switchMap, take, tap} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import LoginFailed = Auth.LoginFailed;
import LoginSuccess = Auth.LoginSuccess;

export interface AuthStateModel {
  accessToken: string;
  user: any; // User;
  loading: boolean;
  errors: string[];
}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('auth');

@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    accessToken: null,
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
  ) {}

  @Action(Login)
  login(context: StateContext<AuthStateModel>, {payload}: Login): any {
    context.patchState({
      loading: true
    });
    return this.authService.login(payload.username, payload.password).pipe(
      take(1),
      catchError((error) => {
        console.log(error);
        context.dispatch(new Auth.LoginFailed([error]));
        return of(null);
      }),
      tap(result => {
        if (result) {
          console.log(result);
          return context.dispatch(new Auth.LoginSuccess({
            accessToken: result.login.token,
            user: result.login.user
          }));
        }
      })
    );
  }

  @Action(LoginFailed)
  loginFailed(context: StateContext<AuthStateModel>, {errors}: LoginFailed): any {
    context.setState({
      accessToken: null,
      user: null,
      loading: false,
      errors
    });
  }

  @Action(LoginSuccess)
  loginSuccess(context: StateContext<AuthStateModel>, {payload}: LoginSuccess): any {
    context.setState({
      accessToken: payload.accessToken,
      user: payload.user,
      loading: false,
      errors: []
    });
  }
}
