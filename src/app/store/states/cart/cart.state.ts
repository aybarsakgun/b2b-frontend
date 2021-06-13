import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {catchError, take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ErrorResult} from '../../../graphql/results/error.result';
import {CartModel} from '../../../models/cart/cart.model';
import {Cart} from '../../actions/cart/cart.action';
import {CartResults} from '../../../graphql/results/cart/cart.results';
import {CartService} from '../../../modules/cart/cart.service';

export interface CartStateModel {
  items: CartModel[];
  loading: boolean;
  errors: string[];
}

export const CART_STATE_TOKEN = new StateToken<CartStateModel>('cart');

@State<CartStateModel>({
  name: CART_STATE_TOKEN,
  defaults: {
    items: [],
    loading: false,
    errors: []
  }
})
@Injectable()
export class CartState {
  @Selector()
  static isLoading(state: CartStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static items(state: CartStateModel): CartModel[] {
    return state.items;
  }

  @Selector()
  static errors(state: CartStateModel): string[] {
    return state.errors;
  }

  constructor(
    private cartService: CartService
  ) {
  }

  @Action(Cart.Fetch)
  fetch({patchState, dispatch}: StateContext<CartStateModel>): Observable<CartResults.FetchResult[] | void> {
    patchState({
      loading: true
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
      loading: false,
      errors,
    });
  }

  @Action([Cart.FetchSuccess])
  setCartItems({setState}: StateContext<CartStateModel>, {cart}: Cart.FetchSuccess): void {
    setState({
      items: cart,
      loading: false,
      errors: [],
    });
  }
}
