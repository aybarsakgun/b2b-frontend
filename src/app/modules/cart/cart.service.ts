import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GraphQLService} from '../../graphql/graphql.service';
import {Observable} from 'rxjs';
import {CartResults} from '../../graphql/results/cart/cart.results';
import {FETCH_CART_QUERY} from '../../graphql/queries/cart/cart.queries';

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
}
