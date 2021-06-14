import {gql} from '@apollo/client/core';

export const FETCH_CART_QUERY = gql`
  query fetchCart{
    cart {
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
  }
`;
