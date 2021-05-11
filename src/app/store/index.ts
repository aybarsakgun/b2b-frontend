import * as productListReducer from './reducers/product-list.reducers';
import {createSelector} from '@ngrx/store';

export interface AppState {
  productList: productListReducer.ProductListState;
}
export const AppReducers = {
  productList: productListReducer.productListReducers
};

const productListState = (state: AppState) => state.productList;

export const getProductListState = createSelector(productListState, productListReducer.productListState);
