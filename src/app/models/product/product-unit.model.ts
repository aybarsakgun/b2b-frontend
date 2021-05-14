import {BaseModel} from '../base.model';
import {ProductModel} from './product.model';
import {ProductPriceModel} from './product-price.model';

export class ProductUnitModel extends BaseModel {
  id: number;
  value: string;
  barcode: string;
  defaultPriceOrder: number;
  listPriceOrder: number;
  multiplier: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  product: ProductModel;
  prices: ProductPriceModel[];
}
