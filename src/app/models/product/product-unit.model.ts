import {BaseModel} from '../base.model';
import {ProductPriceModel} from './product-price.model';

export class ProductUnitModel extends BaseModel {
  id: number;
  value: string;
  barcode: string;
  multiplier: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  defaultPrice: ProductPriceModel;
  listPrice: ProductPriceModel;
}
