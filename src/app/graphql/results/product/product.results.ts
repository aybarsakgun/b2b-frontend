import {PaginatedModel} from '../../../models/paginated.model';
import {ProductModel} from '../../../models/product/product.model';
import {CategoryModel} from '../../../models/product/category.model';
import {BrandModel} from '../../../models/product/brand.model';
import {ModelModel} from '../../../models/product/model.model';

export namespace ProductResults {
  export class ProductListResult {
    products: PaginatedModel<ProductModel>;
    categories: CategoryModel[];
    brands: BrandModel[];
    models: ModelModel[];
  }
}
