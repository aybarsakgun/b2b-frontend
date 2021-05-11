import {Action} from '@ngrx/store';

export enum ProductListActions {
  PRODUCTS_FETCHING = '[PRODUCT_LIST] PRODUCTS_FETCHING',
  PRODUCTS_FETCHING_FAIL = '[PRODUCT_LIST] PRODUCTS_FETCHING_FAIL',
  PRODUCTS_FETCHING_SUCCESS = '[PRODUCT_LIST] PRODUCTS_FETCHING_SUCCESS'
}

export class ProductsFetching implements Action {
  readonly type = ProductListActions.PRODUCTS_FETCHING;
}

export class ProductsFetchingFail implements Action {
  readonly type = ProductListActions.PRODUCTS_FETCHING_FAIL;

  constructor(public payload: {
    errors: string[]
  }) {
  }
}

export class ProductsFetchingSuccess implements Action {
  readonly type = ProductListActions.PRODUCTS_FETCHING_SUCCESS;

  constructor(public payload: {
    products: any // todo paginated interface to product
  }) {
  }
}

export type ProductListAction = ProductsFetching | ProductsFetchingFail | ProductsFetchingSuccess;
