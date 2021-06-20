import {gql} from '@apollo/client/core';
import {cartFragment} from '../../fragments/cart/cart.fragments';

export const FETCH_CART_QUERY = gql`
  ${cartFragment}
  query fetchCart{
    cart {
      ...cartFragment
    }
  }
`;
