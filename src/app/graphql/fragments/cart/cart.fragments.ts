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
        defaultPriceOrder
        listPriceOrder
        prices {
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
      defaultPriceOrder
      listPriceOrder
      prices {
        id
        value
        priceOrder
        currency
      }
    }
  }
`;
