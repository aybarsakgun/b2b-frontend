import {BaseModel} from '../base.model';
import {ProductModel} from '../product/product.model';
import {UserModel} from '../user/user.model';
import {ProductUnitModel} from '../product/product-unit.model';

export class CartModel extends BaseModel {
  id: number;
  quantity: number;
  product: ProductModel;
  user: UserModel;
  productUnit: ProductUnitModel;
}
