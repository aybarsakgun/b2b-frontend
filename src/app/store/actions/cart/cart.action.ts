import {CartModel} from '../../../models/cart/cart.model';
import {ProductModel} from '../../../models/product/product.model';
import {ProductUnitModel} from '../../../models/product/product-unit.model';

export namespace Cart {
  export class Fetch {
    static readonly type = '[Cart] Fetch';
  }

  export class FetchFailed {
    static readonly type = '[Cart] Fetch Failed';

    constructor(public errors: string[]) {
    }
  }

  export class FetchSuccess {
    static readonly type = '[Cart] Fetch Success';

    constructor(public cart: CartModel[]) {
    }
  }

  export class AddProduct {
    static readonly type = '[Cart] Add Product';

    constructor(public payload: {
      product: ProductModel,
      quantity: number
    }) {
    }
  }

  export class RemoveProduct {
    static readonly type = '[Cart] Remove Product';

    constructor(public payload: {
      product: ProductModel
    }) {
    }
  }

  export class ChangeQuantity {
    static readonly type = '[Cart] Change Quantity';

    constructor(public payload: {
      product: ProductModel,
      quantity: number
    }) {
    }
  }

  export class ChangeUnit {
    static readonly type = '[Cart] Change Unit';

    constructor(public payload: {
      product: ProductModel,
      unit: ProductUnitModel
    }) {
    }
  }

  export class Clear {
    static readonly type = '[Cart] Clear';
  }
}
