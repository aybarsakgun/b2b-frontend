import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CurrencyModel} from '../../../models/currency/currency.model';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {BaseState} from '../../../store/states/base/base.state';
import {Base} from '../../../store/actions/base/base.action';

@Component({
  selector: 'app-currency-selection',
  templateUrl: './currency-selection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencySelectionComponent {
  public currencySelectionPanelVisibility = false;

  @Select(BaseState.currencies)
  public currencyList: Observable<CurrencyModel[]>;

  @Select(BaseState.activeCurrency)
  public activeCurrency: Observable<CurrencyModel>;

  constructor(
    private store: Store
  ) {
  }

  toggleCurrencySelectionPanelVisibility(): void {
    this.currencySelectionPanelVisibility = !this.currencySelectionPanelVisibility;
  }

  changeActiveCurrency(currency: CurrencyModel): void {
    this.store.dispatch(new Base.ChangeActiveCurrency({currency}));
    this.toggleCurrencySelectionPanelVisibility();
  }
}
