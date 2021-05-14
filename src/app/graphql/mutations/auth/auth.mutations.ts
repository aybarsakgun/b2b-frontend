import {gql} from '@apollo/client/core';
import {userFragment} from '../../fragments/user/user.fragments';

export const AUTH_LOGIN_MUTATION = gql`
  ${userFragment}
  mutation login($loginInput: LoginInput!){
    login(data: $loginInput){
      token
      user{
        ...userFragment
      }
    }
  }
`;
