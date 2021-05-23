import {gql} from '@apollo/client/core';

export const categoryFragment = gql`
  fragment categoryFragment on Category{
    id
    name
    description
    metaTitle
    metaDescription
    metaKeyword
    seo
    order
    parent{
      id
      name
    }
  }
`;
