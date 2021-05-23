import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../../../store/states/auth/auth.state';
import {Observable} from 'rxjs';
import {Auth} from '../../../store/actions/auth/auth.action';
import {Navigate, RouterState} from '@ngxs/router-plugin';
import {BaseState} from '../../../store/states/base/base.state';
import {CategoryModel} from '../../../models/product/category.model';
import {CurrencyModel} from '../../../models/currency/currency.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Select(AuthState.isAuthenticated)
  public isAuthenticated$: Observable<boolean>;

  @Select(BaseState.mainCategories)
  public mainCategories$: Observable<CategoryModel[]>;

  @Select(BaseState.currenciesWithoutMainCurrency)
  public currenciesWithoutMainCurrency$: Observable<CurrencyModel[]>;

  constructor(
    private store: Store
  ) {
  }

  navigateToProductList(category: CategoryModel): void {
    this.store.dispatch(new Navigate(['product/list'], {
      page: 1,
      category: category.id
    }));
  }

  logout(): void {
    const routerState = this.store.selectSnapshot(RouterState);
    const url = routerState.state.url.split('?')[0];
    const queryParams = routerState.state.queryParams;
    this.store.dispatch([new Auth.Logout(), new Navigate([url], queryParams)]);
  }
}
