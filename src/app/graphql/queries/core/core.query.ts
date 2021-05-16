import {gql} from '@apollo/client/core';
import {categoryFragment} from '../../fragments/category/category.fragment';

export const CORE_QUERY = gql`
  ${categoryFragment}
  query core{
    settings{
      id
      key
      value
    }
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
