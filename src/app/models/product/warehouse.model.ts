import {BaseModel} from '../base.model';
import {ProductModel} from './product.model';

export class WarehouseModel extends BaseModel {
  id: number;
  product: ProductModel;
  quantity: number;
  warehouseId: number;
  date: string;
  warehouseName: string;
}
