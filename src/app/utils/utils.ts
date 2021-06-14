import {ProductModel} from '../models/product/product.model';
import {ProductUnitModel} from '../models/product/product-unit.model';
import {ProductPriceModel} from '../models/product/product-price.model';
import {CartModel} from '../models/cart/cart.model';
import {CurrencyModel} from '../models/currency/currency.model';

export function findDefaultUnit(product: ProductModel): ProductUnitModel {
  return product.units.find(unit => unit.value === product.defaultUnit);
}

export function findPriceWithType(product: ProductModel, type: 'defaultPrice' | 'listPrice'): ProductPriceModel {
  const defaultUnit: ProductUnitModel = findDefaultUnit(product);
  return defaultUnit ? (defaultUnit.prices || []).find(price => price.priceOrder === defaultUnit[type + 'Order']) : null;
}

export function priceFormat(price: number, currency: CurrencyModel): string {
  return price.toLocaleString('tr-TR', {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 2,
    currencyDisplay: 'symbol'
  });
}

export function calculateCartTotal(cartItems: CartModel[], currencies: CurrencyModel[], activeCurrency: CurrencyModel): {
  subTotal: string;
  tax: string;
  total: string;
} {
  let subTotal = 0;
  let totalTax = 0;

  cartItems.forEach(item => {
    const vat: number = (100 + item.product.taxRate) / 100;
    const productPrice: ProductPriceModel = (item.productUnit.prices || []).find(price => price.priceOrder === item.productUnit.defaultPriceOrder);
    const usedCurrency: CurrencyModel = currencies.find(currency => currency.code === productPrice?.currency);
    const calculatedPrice: number = (+productPrice?.value * +usedCurrency.exchangeRate) / +activeCurrency.exchangeRate;

    subTotal += calculatedPrice * item.quantity;
    totalTax += ((calculatedPrice * item.quantity) * vat) - (calculatedPrice * item.quantity);
  });

  return {
    subTotal: priceFormat(subTotal, activeCurrency),
    tax: priceFormat(totalTax, activeCurrency),
    total: priceFormat(parseFloat(subTotal.toFixed(2)) + parseFloat(totalTax.toFixed(2)), activeCurrency)
  };
}
