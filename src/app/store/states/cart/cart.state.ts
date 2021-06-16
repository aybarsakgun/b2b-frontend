import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {catchError, take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ErrorResult} from '../../../graphql/results/error.result';
import {CartModel} from '../../../models/cart/cart.model';
import {Cart} from '../../actions/cart/cart.action';
import {CartResults} from '../../../graphql/results/cart/cart.results';
import {CartService} from '../../../modules/cart/cart.service';
import CartOperationType = Cart.CartOperationType;

export interface CartStateModel {
  items: CartModel[];
  operation: {
    type: CartOperationType;
    loading: boolean;
    errors?: string[];
    id?: number;
  };
}

export const CART_STATE_TOKEN = new StateToken<CartStateModel>('cart');

@State<CartStateModel>({
  name: CART_STATE_TOKEN,
  defaults: {
    items: [],
    operation: null
  }
})
@Injectable()
export class CartState {
  @Selector()
  static isLoading(state: CartStateModel): boolean {
    return state.operation?.loading || false;
  }

  @Selector()
  static items(state: CartStateModel): CartModel[] {
    return state.items;
  }

  @Selector()
  static errors(state: CartStateModel): string[] {
    return state.operation?.errors || [];
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
        loading: true
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
        errors
      }
    });
  }

  @Action(Cart.FetchSuccess)
  setCartItems({setState}: StateContext<CartStateModel>, {cart}: Cart.FetchSuccess): void {
    setState({
      items: cart,
      operation: {
        type: CartOperationType.FETCH_SUCCESS,
        loading: false,
        errors: []
      }
    });
  }
}
