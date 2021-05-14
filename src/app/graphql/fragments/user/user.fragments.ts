import {gql} from '@apollo/client/core';

export const userFragment = gql`
  fragment userFragment on User{
    id
    username
    email
    currency
    name
    customerId
    role
    isActive
    branches{
      id
      name
    }
    salesRepresentative{
      id
      name
      phone
      email
    }
    priceOrder
    branch
  }
`;
