import {PriceRangeModel} from './product/price-range.model';

export class CatalogFiltersModel {
  brands?: number[];
  models?: number[];
  category?: number;
  priceRange?: PriceRangeModel;
}
