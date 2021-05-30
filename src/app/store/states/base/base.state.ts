import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken, Store} from '@ngxs/store';
import {catchError, take, tap} from 'rxjs/operators';
import {ErrorResult} from '../../../graphql/results/error.result';
import {BaseService} from '../../../shared/services/base.service';
import {CurrencyModel} from '../../../models/currency/currency.model';
import {CategoryModel} from '../../../models/product/category.model';
import {Base} from '../../actions/base/base.action';
import {SETTING_STATE_TOKEN} from '../setting/setting.state';
import {AUTH_STATE_TOKEN} from '../auth/auth.state';

export interface BaseStateModel {
  currencies: CurrencyModel[];
  activeCurrency: CurrencyModel;
  categories: CategoryModel[];
  loading: boolean;
  errors: string[];
  fetched: boolean;
}

export const BASE_STATE_TOKEN = new StateToken<BaseStateModel>('base');

@State<BaseStateModel>({
  name: BASE_STATE_TOKEN,
  defaults: {
    currencies: [],
    activeCurrency: null,
    categories: [],
    loading: false,
    errors: [],
    fetched: false
  }
})
@Injectable()
export class BaseState {
  @Selector()
  static isLoading(state: BaseStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static isFetched(state: BaseStateModel): boolean {
    return state.fetched;
  }

  @Selector()
  static errors(state: BaseStateModel): string[] {
    return state.errors;
  }

  @Selector()
  static currencies(state: BaseStateModel): CurrencyModel[] {
    return state.currencies;
  }

  @Selector()
  static currenciesWithoutMainCurrency(state: BaseStateModel): CurrencyModel[] {
    return state.currencies.filter(currency => +currency.exchangeRate > 1);
  }

  @Selector()
  static activeCurrency(state: BaseStateModel): CurrencyModel {
    return state.activeCurrency;
  }

  @Selector()
  static categories(state: BaseStateModel): CategoryModel[] {
    return state.categories;
  }

  @Selector()
  static mainCategories(state: BaseStateModel): CategoryModel[] {
    return state.categories.filter(category => !category.parent);
  }

  constructor(
    private baseService: BaseService,
    private store: Store
  ) {
  }

  @Action(Base.Fetch)
  fetch({patchState, dispatch}: StateContext<BaseStateModel>): any {
    patchState({
      loading: true
    });
    const findActiveCurrency = (currencies: CurrencyModel[]): CurrencyModel => {
      const getDefaultCurrencySetting: string = this.store.selectSnapshot(SETTING_STATE_TOKEN).settings['defaultCurrency'];
      const getUserCurrency: string = this.store.selectSnapshot(AUTH_STATE_TOKEN).user?.currency;
      if (getDefaultCurrencySetting && getDefaultCurrencySetting === 'Customer' && getUserCurrency) {
        return currencies.find(currency => currency.name === getUserCurrency);
      }
      return currencies[0] || null;
    };
    return this.baseService.fetchBases().pipe(
      take(1),
      tap((result) => {
        return dispatch(new Base.FetchSuccess({
          currencies: result.currencies,
          activeCurrency: findActiveCurrency(result.currencies),
          categories: result.categories
        }));
      }),
      catchError((error: ErrorResult) => {
        return dispatch(new Base.FetchFailed(error.map((err) => (err.message))));
      }),
    );
  }

  @Action(Base.FetchFailed)
  fetchFailed({setState}: StateContext<BaseStateModel>, {errors}: Base.FetchFailed): void {
    setState({
      currencies: [],
      activeCurrency: null,
      categories: [],
      loading: false,
      errors,
      fetched: true
    });
  }

  @Action(Base.FetchSuccess)
  fetchSuccess({setState}: StateContext<BaseStateModel>, {payload}: Base.FetchSuccess): void {
    setState({
      currencies: payload.currencies,
      activeCurrency: payload.activeCurrency,
      categories: payload.categories,
      loading: false,
      errors: [],
      fetched: true
    });
  }

  @Action(Base.ChangeActiveCurrency)
  changeActiveCurrency({patchState}: StateContext<BaseStateModel>, {payload}: Base.ChangeActiveCurrency): any {
    patchState({
      activeCurrency: payload.currency
    });
  }
}
