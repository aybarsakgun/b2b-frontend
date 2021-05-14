import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../../../store/states/auth/auth.state';
import {Observable} from 'rxjs';
import {Auth} from '../../../store/actions/auth/auth.action';

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
    this.store.dispatch(new Auth.Logout());
  }
}
