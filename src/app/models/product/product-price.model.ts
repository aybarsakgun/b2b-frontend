import {BaseModel} from '../base.model';
import {ProductUnitModel} from './product-unit.model';

export class ProductPriceModel extends BaseModel {
  id: number;
  value: string;
  currency: string;
  priceOrder: number;
  unit: ProductUnitModel;
}
