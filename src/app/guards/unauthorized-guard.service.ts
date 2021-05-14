import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable, of} from 'rxjs';
import {filter, switchMap, take} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {AUTH_STATE_TOKEN} from '../store/states/auth/auth.state';
import {Navigate} from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedGuard implements CanActivate {
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
          return this.store.dispatch(new Navigate(['/']));
        }
        return of(true);
      })
    );
  }
}
