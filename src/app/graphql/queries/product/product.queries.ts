import {gql} from '@apollo/client/core';

export const PRODUCT_LIST_QUERY = gql`
  query productList($pagination: PaginationInput, $catalogFilters: CatalogFiltersInput, $catalogSorting: CatalogSortingInput){
    products(pagination: $pagination, filters: $catalogFilters, sorting: $catalogSorting) {
      total
      totalPage
      page
      limit
      items {
        id
        code
        equivalentCode
        name
        metaDescription
        metaTitle
        metaKeywords
        description
        seo
        defaultUnit
        quantity
        taxRate
        units {
          id
          value
          barcode
          multiplier
          length
          width
          height
          weight
          defaultPrice {
            id
            value
            priceOrder
            currency
          }
          listPrice {
            id
            value
            priceOrder
            currency
          }
        }
#        categories {
#          id
#          name
#          description
#          metaTitle
#          metaDescription
#          metaKeyword
#          seo
#        }
        warehouses {
          id
          quantity
          warehouseId
          date
          warehouseName
        }
        model {
          id
          name
          # brand {
          #   id
          #   name
          #   code
          # }
        }
        brand {
          id
          name
          code
          # models {
          #   id
          #   name
          #   brand {
          #     id
          #     name
          #   }
          # }
        }
        currency
      }
    }
    brands(filters: $catalogFilters) {
      id
      name
      # models {
      #   id
      #   name
      #   brand {
      #     id
      #     name
      #     productCount
      #   }
      # }
      productCount
    }
    categories(filters: $catalogFilters) {
      id
      name
      parent{
        id
        name
      }
      # children {
      #   id
      #   name
      #   productCount
      #   children {
      #     id
      #     name
      #     productCount
      #     children {
      #       id
      #       name
      #       productCount
      #     }
      #   }
      # }
      productCount
    }
    models(filters: $catalogFilters) {
      id
      name
      # brand{
      #   id
      #   name
      #   code
      #   models{id}
      #   productCount
      # }
      productCount
    }
  }
`;
