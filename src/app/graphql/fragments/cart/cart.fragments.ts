import {gql} from '@apollo/client/core';

export const cartFragment = gql`
  fragment cartFragment on Cart{
    id
    quantity
    product {
      id
      name
      defaultUnit
      currency
      taxRate
      units {
        id
        value
        defaultPrice {
          id
          value
          priceOrder
          currency
        }
        listPrice {
          id
          value
          priceOrder
          currency
        }
      }
    }
    productUnit {
      id
      value
      defaultPrice {
        id
        value
        priceOrder
        currency
      }
      listPrice {
        id
        value
        priceOrder
        currency
      }
    }
  }
`;
