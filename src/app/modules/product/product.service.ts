import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GraphQLService} from '../../graphql/graphql.service';
import {PaginationModel} from '../../models/pagination.model';
import {CatalogFiltersModel} from '../../models/catalog-filters.model';
import {PRODUCT_LIST_QUERY} from '../../graphql/queries/product/product.queries';
import {Observable} from 'rxjs';
import {ProductResults} from '../../graphql/results/product/product.results';

@Injectable()
export class ProductService extends GraphQLService {
  constructor(
    protected apollo: Apollo
  ) {
    super(apollo);
  }

  productList(
    pagination?: PaginationModel,
    catalogFilters?: CatalogFiltersModel
  ): Observable<ProductResults.ProductListResult> {
    return this.execute('query', PRODUCT_LIST_QUERY, {
      pagination,
      catalogFilters
    });
  }
}
