import {BaseModel} from '../base.model';
import {ProductModel} from '../product/product.model';
import {UserModel} from '../user/user.model';
import {ProductUnitModel} from '../product/product-unit.model';
import {Cart} from '../../store/actions/cart/cart.action';
import CartOperationType = Cart.CartOperationType;

export class CartModel extends BaseModel {
  id: number;
  quantity: number;
  product: ProductModel;
  user: UserModel;
  productUnit: ProductUnitModel;
}

export class CartOperationModel {
  type: CartOperationType;
  loading: boolean;
  errors: string[];
  id: number;
}
