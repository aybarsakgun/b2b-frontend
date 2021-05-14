import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngxs/store';
import {AUTH_STATE_TOKEN} from './store/states/auth/auth.state';
import {Auth} from './store/actions/auth/auth.action';
import {filter, take, tap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    private store: Store,
    private translateService: TranslateService
  ) {
    this.store.select(AUTH_STATE_TOKEN).pipe(
      take(1),
      filter((authState) => !authState.loading),
      tap((authState) => {
        if (authState.accessToken) {
          this.store.dispatch(new Auth.CurrentUser());
        }
      })
    ).subscribe();
    this.translateService.addLangs(['en', 'tr']);
    this.translateService.setDefaultLang('tr');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/en|tr/) ? browserLang : 'tr');
  }
}
