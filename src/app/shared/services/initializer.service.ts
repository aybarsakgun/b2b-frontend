import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {Setting} from '../../store/actions/setting/setting.action';
import {SETTING_STATE_TOKEN} from '../../store/states/setting/setting.state';
import {filter, take} from 'rxjs/operators';
import {AUTH_STATE_TOKEN, AuthState} from '../../store/states/auth/auth.state';
import {Auth} from '../../store/actions/auth/auth.action';
import {JWT_TOKEN_NAME} from '../../constants';
import {Base} from '../../store/actions/base/base.action';
import {BASE_STATE_TOKEN} from '../../store/states/base/base.state';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class InitializerService {
  constructor(
    private store: Store,
    private translateService: TranslateService
  ) {
  }

  async handleSettings(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.store.dispatch(new Setting.Fetch());
      this.store.select(SETTING_STATE_TOKEN).pipe(
        filter(settingState => !settingState.loading),
        take(1)
      ).subscribe(settingState => {
        console.log('handleSettings', settingState);
        if (settingState.errors.length) {
          console.log('handleSettings Rejected');
          return reject(settingState.errors);
        } else {
          console.log('handleSettings Resolved');
          return resolve();
        }
      });
    });
  }

  async handleAuth(): Promise<any> {
    return new Promise<any>((resolve) => {
      if (localStorage.getItem(JWT_TOKEN_NAME)) {
        this.store.dispatch(new Auth.CurrentUser());
        this.store.select(AUTH_STATE_TOKEN).pipe(
          filter((authState) => !authState.loading),
          take(1)
        ).subscribe((authState) => {
          console.log('handleAuth resolved', authState);
          return resolve();
        });
      } else {
        return resolve();
      }
    });
  }

  async handleBases(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
      const {firstPageIsLogin} = this.store.selectSnapshot(SETTING_STATE_TOKEN).settings;
      if (!isAuthenticated && !!+firstPageIsLogin) {
        return resolve();
      }
      this.store.dispatch(new Base.Fetch());
      this.store.select(BASE_STATE_TOKEN).pipe(
        filter(baseState => !baseState.loading),
        take(1)
      ).subscribe(baseState => {
        if (baseState.errors.length) {
          return reject(baseState.errors);
        } else {
          return resolve();
        }
      });
    });
  }

  async init(): Promise<any> {
    this.translateService.addLangs(['en', 'tr']);
    this.translateService.setDefaultLang('tr');
    const browserLang = this.translateService.getBrowserLang();
    await Promise.all([
      await this.handleSettings(),
      await this.handleAuth(),
      await this.handleBases(),
      await this.translateService.use(browserLang.match(/en|tr/) ? browserLang : 'tr').toPromise()
    ]);
  }
}
