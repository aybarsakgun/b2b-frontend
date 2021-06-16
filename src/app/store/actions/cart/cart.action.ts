import {CartModel} from '../../../models/cart/cart.model';
import {ProductModel} from '../../../models/product/product.model';
import {ProductUnitModel} from '../../../models/product/product-unit.model';

export namespace Cart {
  export enum CartOperationType {
    FETCH = '[Cart] Fetch',
    FETCH_FAILED = '[Cart] Fetch Failed',
    FETCH_SUCCESS = '[Cart] Fetch Success',
    ADD_ITEM = '[Cart] Add Item',
    ADD_ITEM_FAILED = '[Cart] Add Item Failed',
    ADD_ITEM_SUCCESS = '[Cart] Add Item Success',
    REMOVE_ITEM = '[Cart] Remove Item',
    REMOVE_ITEM_FAILED = '[Cart] Remove Item Failed',
    REMOVE_ITEM_SUCCESS = '[Cart] Remove Item Success',
    CHANGE_QUANTITY = '[Cart] Change Quantity',
    CHANGE_QUANTITY_FAILED = '[Cart] Change Quantity Failed',
    CHANGE_QUANTITY_SUCCESS = '[Cart] Change Quantity Success',
    CHANGE_UNIT = '[Cart] Change Unit',
    CHANGE_UNIT_FAILED = '[Cart] Change Unit Failed',
    CHANGE_UNIT_SUCCESS = '[Cart] Change Unit Success',
    CLEAR = '[Cart] Clear',
    CLEAR_FAILED = '[Cart] Clear Failed',
    CLEAR_SUCCESS = '[Cart] Clear Success',
  }

  export class Fetch {
    static readonly type = CartOperationType.FETCH;
  }

  export class FetchFailed {
    static readonly type = CartOperationType.FETCH_FAILED;

    constructor(public errors: string[]) {
    }
  }

  export class FetchSuccess {
    static readonly type = CartOperationType.FETCH_SUCCESS;

    constructor(public cart: CartModel[]) {
    }
  }

  export class AddItem {
    static readonly type = CartOperationType.ADD_ITEM;

    constructor(public payload: {
      product: ProductModel,
      quantity: number
    }) {
    }
  }

  export class AddItemFailed {
    static readonly type = CartOperationType.ADD_ITEM_FAILED;

    constructor(public errors: string[]) {
    }
  }

  export class AddItemSuccess {
    static readonly type = CartOperationType.ADD_ITEM_SUCCESS;

    constructor(public cart: CartModel[]) {
    }
  }

  export class RemoveItem {
    static readonly type = CartOperationType.REMOVE_ITEM;

    constructor(public payload: {
      product: ProductModel
    }) {
    }
  }

  export class RemoveItemFailed {
    static readonly type = CartOperationType.REMOVE_ITEM_FAILED;

    constructor(public errors: string[]) {
    }
  }

  export class RemoveItemSuccess {
    static readonly type = CartOperationType.REMOVE_ITEM_SUCCESS;

    constructor(public cart: CartModel[]) {
    }
  }

  export class ChangeQuantity {
    static readonly type = CartOperationType.CHANGE_QUANTITY;

    constructor(public payload: {
      product: ProductModel,
      quantity: number
    }) {
    }
  }

  export class ChangeQuantityFailed {
    static readonly type = CartOperationType.CHANGE_QUANTITY_FAILED;

    constructor(public errors: string[]) {
    }
  }

  export class ChangeQuantitySuccess {
    static readonly type = CartOperationType.CHANGE_QUANTITY_SUCCESS;

    constructor(public cart: CartModel[]) {
    }
  }

  export class ChangeUnit {
    static readonly type = CartOperationType.CHANGE_UNIT;

    constructor(public payload: {
      product: ProductModel,
      unit: ProductUnitModel
    }) {
    }
  }

  export class ChangeUnitFailed {
    static readonly type = CartOperationType.CHANGE_UNIT_FAILED;

    constructor(public errors: string[]) {
    }
  }

  export class ChangeUnitSuccess {
    static readonly type = CartOperationType.CHANGE_UNIT_SUCCESS;

    constructor(public cart: CartModel[]) {
    }
  }

  export class Clear {
    static readonly type = CartOperationType.CLEAR;
  }

  export class ClearFailed {
    static readonly type = CartOperationType.CLEAR_FAILED;

    constructor(public errors: string[]) {
    }
  }

  export class ClearSuccess {
    static readonly type = CartOperationType.CLEAR_SUCCESS;

    constructor(public cart: CartModel[]) {
    }
  }
}
