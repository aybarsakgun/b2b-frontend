import {gql} from '@apollo/client/core';

export const AUTH_LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!){
    login(data: $loginInput){
      token
      user{
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
    }
  }
`;
