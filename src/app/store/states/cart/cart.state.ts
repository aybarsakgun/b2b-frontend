import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {catchError, take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ErrorResult} from '../../../graphql/results/error.result';
import {CartModel, CartOperationModel} from '../../../models/cart/cart.model';
import {Cart} from '../../actions/cart/cart.action';
import {CartResults} from '../../../graphql/results/cart/cart.results';
import {CartService} from '../../../modules/cart/cart.service';
import CartOperationType = Cart.CartOperationType;

export interface CartStateModel {
  items: CartModel[];
  operation: CartOperationModel;
}

export const CART_STATE_TOKEN = new StateToken<CartStateModel>('cart');

@State<CartStateModel>({
  name: CART_STATE_TOKEN,
  defaults: {
    items: [],
    operation: {
      type: null,
      loading: false,
      errors: [],
      id: null
    }
  }
})
@Injectable()
export class CartState {
  @Selector()
  static isLoading(state: CartStateModel): boolean {
    return state.operation.loading || false;
  }

  @Selector()
  static items(state: CartStateModel): CartModel[] {
    return state.items;
  }

  @Selector()
  static errors(state: CartStateModel): string[] {
    return state.operation.errors || [];
  }

  @Selector()
  static operation(state: CartStateModel): CartOperationModel {
    return state.operation;
  }

  constructor(
    private cartService: CartService
  ) {
  }

  @Action(Cart.Fetch)
  fetch({patchState, dispatch}: StateContext<CartStateModel>): Observable<CartResults.FetchResult[] | void> {
    patchState({
      operation: {
        type: CartOperationType.FETCH,
        loading: true,
        errors: [],
        id: null
      }
    });
    return this.cartService.fetch().pipe(
      take(1),
      tap((result) => {
        return dispatch(new Cart.FetchSuccess(result));
      }),
      catchError((error: ErrorResult) => {
        return dispatch(new Cart.FetchFailed(error.map((err) => (err.message))));
      })
    );
  }

  @Action(Cart.FetchFailed)
  fetchFailed({setState}: StateContext<CartStateModel>, {errors}: Cart.FetchFailed): void {
    setState({
      items: [],
      operation: {
        type: CartOperationType.FETCH_FAILED,
        loading: false,
        errors,
        id: null
      }
    });
  }

  @Action(Cart.FetchSuccess)
  fetchSuccess({setState}: StateContext<CartStateModel>, {cart}: Cart.FetchSuccess): void {
    setState({
      items: cart,
      operation: {
        type: CartOperationType.FETCH_SUCCESS,
        loading: false,
        errors: [],
        id: null
      }
    });
  }

  @Action(Cart.AddItem)
  addItem({patchState, dispatch}: StateContext<CartStateModel>, {payload}: Cart.AddItem): Observable<CartResults.AddItemResult[] | void> {
    patchState({
      operation: {
        type: CartOperationType.ADD_ITEM,
        loading: true,
        errors: [],
        id: payload.product.id
      }
    });
    return this.cartService.addItem({
      productId: +payload.product.id,
      quantity: payload.quantity
    }).pipe(
      take(1),
      tap((result) => {
        return dispatch(new Cart.AddItemSuccess(result));
      }),
      catchError((error: ErrorResult) => {
        return dispatch(new Cart.AddItemFailed(error.map((err) => (err.message))));
      })
    );
  }

  @Action(Cart.AddItemFailed)
  addItemFailed({patchState, getState}: StateContext<CartStateModel>, {errors}: Cart.AddItemFailed): void {
    patchState({
      operation: {
        type: CartOperationType.ADD_ITEM_FAILED,
        loading: false,
        errors,
        id: getState().operation.id
      }
    });
  }

  @Action(Cart.AddItemSuccess)
  addItemSuccess({setState, getState}: StateContext<CartStateModel>, {cart}: Cart.AddItemSuccess): void {
    setState({
      items: cart,
      operation: {
        type: CartOperationType.ADD_ITEM_SUCCESS,
        loading: false,
        errors: [],
        id: getState().operation.id
      }
    });
  }

  @Action(Cart.RemoveItem)
  removeItem({patchState, dispatch}: StateContext<CartStateModel>, {payload}: Cart.RemoveItem): Observable<CartResults.RemoveItemResult[] | void> {
    patchState({
      operation: {
        type: CartOperationType.REMOVE_ITEM,
        loading: true,
        errors: [],
        id: payload.product.id
      }
    });
    return this.cartService.removeItem(+payload.cartId).pipe(
      take(1),
      tap((result) => {
        return dispatch(new Cart.RemoveItemSuccess(result));
      }),
      catchError((error: ErrorResult) => {
        return dispatch(new Cart.RemoveItemFailed(error.map((err) => (err.message))));
      })
    );
  }

  @Action(Cart.RemoveItemFailed)
  removeItemFailed({patchState, getState}: StateContext<CartStateModel>, {errors}: Cart.RemoveItemFailed): void {
    patchState({
      operation: {
        type: CartOperationType.REMOVE_ITEM_FAILED,
        loading: false,
        errors,
        id: getState().operation.id
      }
    });
  }

  @Action(Cart.RemoveItemSuccess)
  removeItemSuccess({setState, getState}: StateContext<CartStateModel>, {cart}: Cart.RemoveItemSuccess): void {
    setState({
      items: cart,
      operation: {
        type: CartOperationType.REMOVE_ITEM_SUCCESS,
        loading: false,
        errors: [],
        id: getState().operation.id
      }
    });
  }
}
