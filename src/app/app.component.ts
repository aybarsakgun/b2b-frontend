import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngxs/store';
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
    this.translateService.addLangs(['en', 'tr']);
    this.translateService.setDefaultLang('tr');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/en|tr/) ? browserLang : 'tr');
  }
}
