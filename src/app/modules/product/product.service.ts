import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {DocumentNode, gql} from '@apollo/client/core';
import {GraphQLService} from '../../graphql/graphql.service';

@Injectable()
export class ProductService extends GraphQLService {
  constructor(
    protected apollo: Apollo
  ) {
    super(apollo);
  }

  async getProducts(): Promise<any> {
    const query: DocumentNode = gql`
      query getProducts{
        products(pagination: { page: 1, limit: 20 }) {
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
              defaultPriceOrder
              listPriceOrder
              multiplier
              length
              width
              height
              weight
              product {
                id
                name
              }
              prices {
                id
                value
                currency
                priceOrder
              }
            }
            categories {
              id
              name
              description
              metaTitle
              metaDescription
              metaKeyword
              seo
              # parent {
              #   id
              #   parent{id,parent{id,parent{id,parent{id}}}}
              # }
              # children {
              #   id
              #   name
              #   children {
              #     id
              #     name
              #     children {
              #       id
              #       name
              #     }
              #   }
              # }
            }
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
      }
    `;
    try {
      const {products} = await this.query(query);
      return products;
    } catch (e) {
      throw new Error(e);
    }
  }
}
