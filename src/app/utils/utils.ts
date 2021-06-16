import {ProductModel} from '../models/product/product.model';
import {ProductUnitModel} from '../models/product/product-unit.model';
import {ProductPriceModel} from '../models/product/product-price.model';
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
