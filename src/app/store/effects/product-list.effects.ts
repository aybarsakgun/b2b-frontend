import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {ProductListActions} from '../actions/product-list.actions';
import * as _productListActions from '../actions/product-list.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as rootStore from '../index';
import {ProductService} from '../../modules/product/product.service';

@Injectable()
export class ProductListEffects {
  @Effect()
  productsFetching$: Observable<Action> = this.actions.pipe(
    ofType(ProductListActions.PRODUCTS_FETCHING),
    switchMap((test) => {
      console.log(test);
      return this.productService.getProducts();
    }),
    map((result) => {
      if (result.products) {
        return new _productListActions.ProductsFetchingSuccess(result);
      }
    }),
    catchError(({message}) => {
      return of(new _productListActions.ProductsFetchingFail({errors: [message]}));
    })
  );

  constructor(
    private actions: Actions,
    private store: Store<rootStore.AppState>,
    private productService: ProductService
  ) {
  }
}
