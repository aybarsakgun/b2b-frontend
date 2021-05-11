import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {gql} from '@apollo/client/core';
import {Subscription} from 'rxjs';

@Injectable()
export class ProductService {
  constructor(
    private apolloService: Apollo
  ) {
  }

  async getProducts(variables: any = null): Promise<any> {
    const queryOptions: any = {
      query: gql`
        {
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
      `,
      ...variables && {variables}
    };
    return new Promise<any>((resolve: (data) => void, reject: (data) => void) => {
      const subscription: Subscription = this.apolloService.watchQuery<any>(queryOptions)
        .valueChanges.subscribe(({data, errors}) => {
          if (errors) {
            reject(errors.map(error => error.message).join(', '));
          } else {
            resolve(data);
          }
        }, (error: Error) => {
          reject(error.message);
        }, () => {
          subscription.unsubscribe();
        });
    });
  }
}
