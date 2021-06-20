import {gql} from '@apollo/client/core';
import {cartFragment} from '../../fragments/cart/cart.fragments';

export const ADD_ITEM_TO_CART_MUTATION = gql`
  ${cartFragment}
  mutation addItemToCart($addItemToCartInput: AddItemToCartInput!){
    addItemToCart(data: $addItemToCartInput){
      ...cartFragment
    }
  }
`;

export const REMOVE_ITEM_FROM_CART_MUTATION = gql`
  ${cartFragment}
  mutation removeItemFromCart($id: Int!){
    removeItemFromCart(id: $id){
      ...cartFragment
    }
  }
`;
