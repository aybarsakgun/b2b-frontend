import {gql} from '@apollo/client/core';
import {userFragment} from '../../fragments/user/user.fragments';

export const CURRENT_USER_QUERY = gql`
  ${userFragment}
  query currentUser{
    currentUser{
      ...userFragment
    }
  }
`;
