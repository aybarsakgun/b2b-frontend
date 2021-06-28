import {BaseModel} from '../base.model';

export class ProductPriceModel extends BaseModel {
  id: number;
  value: string;
  currency: string;
  priceOrder: number;
}
