import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable, of} from 'rxjs';
import {filter, map, switchMap, take, tap} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {AUTH_STATE_TOKEN} from '../store/states/auth/auth.state';
import {Navigate} from '@ngxs/router-plugin';
import {SETTING_STATE_TOKEN} from '../store/states/setting/setting.state';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  constructor(
    private store: Store
  ) {
  }

  public canActivate(): Observable<boolean> {
    return this.store.select(AUTH_STATE_TOKEN).pipe(
      filter((authState) => !authState.loading),
      take(1),
      switchMap((authState) => {
        if (authState.accessToken && authState.user) {
          return of(true);
        }
        return this.store.select(SETTING_STATE_TOKEN).pipe(
          filter((settingState) => !settingState.loading),
          take(1),
          map((state) => {
            return !+state.settings['firstPageIsLogin'];
          })
        );
      }),
      tap((canActivate) => !canActivate && this.store.dispatch(new Navigate(['auth/login'])))
    );
  }
}
