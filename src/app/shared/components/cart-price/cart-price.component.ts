import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Select} from '@ngxs/store';
import {BaseState} from '../../../store/states/base/base.state';
import {priceFormat} from '../../../utils/utils';
import {Observable} from 'rxjs';
import {CurrencyModel} from '../../../models/currency/currency.model';
import {CartModel} from '../../../models/cart/cart.model';
import {ProductPriceModel} from '../../../models/product/product-price.model';

@Component({
  selector: 'app-cart-price[cartItems][type]',
  templateUrl: './cart-price.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPriceComponent {
  @Input() cartItems: CartModel[] = null;
  @Input() type: 'subTotal' | 'tax' | 'total';

  @Select(BaseState.currencies)
  public currencies$: Observable<CurrencyModel[]>;

  @Select(BaseState.activeCurrency)
  public activeCurrency$: Observable<CurrencyModel>;

  calculateCartTotal(currencies: CurrencyModel[], activeCurrency: CurrencyModel): string {
    let subTotal = 0;
    let totalTax = 0;

    this.cartItems.forEach(item => {
      const vat: number = (100 + item.product.taxRate) / 100;
      const productPrice: ProductPriceModel = item.productUnit.defaultPrice;
      const usedCurrency: CurrencyModel = currencies.find(currency => currency.code === productPrice?.currency);
      const calculatedPrice: number = (+productPrice?.value * +usedCurrency.exchangeRate) / +activeCurrency.exchangeRate;

      subTotal += calculatedPrice * item.quantity;
      totalTax += ((calculatedPrice * item.quantity) * vat) - (calculatedPrice * item.quantity);
    });

    switch (this.type) {
      case 'subTotal':
        return priceFormat(subTotal, activeCurrency);
      case 'tax':
        return priceFormat(totalTax, activeCurrency);
      case 'total':
        return priceFormat(parseFloat(subTotal.toFixed(2)) + parseFloat(totalTax.toFixed(2)), activeCurrency);
    }
  }
}
