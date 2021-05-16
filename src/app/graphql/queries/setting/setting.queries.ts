import {gql} from '@apollo/client/core';

export const SETTING_FETCH_SETTINGS = gql`
  query fetchSettings{
    settings{
      id
      key
      value
    }
  }
`;
