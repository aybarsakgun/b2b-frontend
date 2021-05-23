import {gql} from '@apollo/client/core';
import {categoryFragment} from '../../fragments/category/category.fragment';

export const FETCH_BASES_QUERY = gql`
  ${categoryFragment}
  query fetchBases{
    currencies{
      id
      code
      name
      symbol
      exchangeRate
    }
    categories{
      ...categoryFragment,
      children{
        ...categoryFragment
        children{
          ...categoryFragment
          children{
            ...categoryFragment
            children{
              ...categoryFragment
              children{
                ...categoryFragment
                children{
                  ...categoryFragment
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const FETCH_SETTINGS_QUERY = gql`
  query fetchSettings{
    settings{
      id
      key
      value
    }
  }
`;
