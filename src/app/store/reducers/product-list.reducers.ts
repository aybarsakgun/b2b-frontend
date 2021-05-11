import {ProductListAction, ProductListActions} from '../actions/product-list.actions';

export interface ProductListState {
  loading: boolean;
  errors: string[];
  products: any; // // todo paginated interface to product
}

export const productListInitialState: ProductListState = {
  loading: false,
  errors: [],
  products: null
};

export function productListReducers(initialState = productListInitialState, action: ProductListAction): ProductListState {
  switch (action.type) {
    case ProductListActions.PRODUCTS_FETCHING: {
      return {
        ...initialState,
        loading: true
      };
    }
    case ProductListActions.PRODUCTS_FETCHING_FAIL: {
      return {
        loading: false,
        errors: action.payload.errors,
        products: null
      };
    }
    case ProductListActions.PRODUCTS_FETCHING_SUCCESS: {
      return {
        loading: false,
        errors: [],
        products: action.payload.products
      };
    }
    default: {
      return initialState;
    }
  }
}

export const productListState = (state: ProductListState) => state;
