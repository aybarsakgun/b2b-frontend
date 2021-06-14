import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ProductModel} from '../../../models/product/product.model';
import {Select} from '@ngxs/store';
import {BaseState} from '../../../store/states/base/base.state';
import {findPriceWithType, priceFormat} from '../../../utils/utils';
import {SettingState} from '../../../store/states/setting/setting.state';
import {Observable} from 'rxjs';
import {CurrencyModel} from '../../../models/currency/currency.model';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPriceComponent {
  @Input() product: ProductModel = null;
  @Input() priceType: 'defaultPrice' | 'listPrice' = 'defaultPrice';
  @Input() quantity = 1;
  @Input() withTax = false;

  @Select(SettingState.settings)
  public settings$: Observable<{
    [settingKey: string]: string
  }>;

  @Select(BaseState.currencies)
  public currencies$: Observable<CurrencyModel[]>;

  @Select(BaseState.activeCurrency)
  public activeCurrency$: Observable<CurrencyModel>;

  formatPrice(settings: { [settingKey: string]: string }, currencies: CurrencyModel[], activeCurrency: CurrencyModel): string {
    const productPrice = findPriceWithType(this.product, this.priceType);
    const currencyShortName = productPrice.currency === 'TL' ? 'TRY' : productPrice.currency;
    const productCurrency = currencies.find(currency => currency.code === currencyShortName);
    const withTax = settings.productsWithKdv === '1' || this.withTax;
    return settings.showPriceStatus === '1' ? priceFormat((
      ((+productPrice.value * +productCurrency.exchangeRate) / +activeCurrency.exchangeRate) *
      this.quantity *
      (withTax ? ((100 + this.product.taxRate) / 100) : 1)), activeCurrency
    ) : '';
  }
}
