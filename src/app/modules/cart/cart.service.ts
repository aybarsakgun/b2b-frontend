import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GraphQLService} from '../../graphql/graphql.service';
import {Observable} from 'rxjs';
import {CartResults} from '../../graphql/results/cart/cart.results';
import {FETCH_CART_QUERY} from '../../graphql/queries/cart/cart.queries';
import {ADD_ITEM_TO_CART_MUTATION, REMOVE_ITEM_FROM_CART_MUTATION} from '../../graphql/mutations/cart/cart.mutations';

@Injectable({
  providedIn: 'root'
})
export class CartService extends GraphQLService {
  constructor(
    protected apollo: Apollo
  ) {
    super(apollo);
  }

  fetch(): Observable<CartResults.FetchResult[]> {
    return this.execute('query', FETCH_CART_QUERY, null, {
      responseKey: 'cart'
    });
  }

  addItem(addItemToCartInput: {
    productId: number,
    quantity: number
  }): Observable<CartResults.AddItemResult[]> {
    return this.execute('mutation', ADD_ITEM_TO_CART_MUTATION, {
      addItemToCartInput
    }, {
      responseKey: 'addItemToCart'
    });
  }

  removeItem(cartId: number): Observable<CartResults.RemoveItemResult[]> {
    return this.execute('mutation', REMOVE_ITEM_FROM_CART_MUTATION, {
      id: cartId
    }, {
      responseKey: 'removeItemFromCart'
    });
  }
}
