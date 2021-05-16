import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../../../store/states/auth/auth.state';
import {Observable} from 'rxjs';
import {Auth} from '../../../store/actions/auth/auth.action';
import {Navigate, RouterState} from '@ngxs/router-plugin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Select(AuthState.isAuthenticated)
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store
  ) {
  }

  logout(): void {
    const routerState = this.store.selectSnapshot(RouterState);
    const url = routerState.state.url.split('?')[0];
    const queryParams = routerState.state.queryParams;
    this.store.dispatch([new Auth.Logout(), new Navigate([url], queryParams)]);
  }
}
