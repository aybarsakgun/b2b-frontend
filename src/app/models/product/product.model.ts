import {BaseModel} from '../base.model';
import {ProductUnitModel} from './product-unit.model';
import {WarehouseModel} from './warehouse.model';
import {CategoryModel} from './category.model';
import {ModelModel} from './model.model';
import {BrandModel} from './brand.model';

export class ProductModel extends BaseModel {
  id: number;
  code: string;
  equivalentCode: string;
  name: string;
  metaDescription: string;
  metaTitle: string;
  metaKeywords: string;
  description: string;
  seo: string;
  defaultUnit: string;
  quantity: number;
  taxRate: number;
  image: string;
  parent: ProductModel;
  children: ProductModel[];
  units: ProductUnitModel[];
  warehouses: WarehouseModel[];
  categories: CategoryModel[];
  model: ModelModel;
  brand: BrandModel;
  currency: string;
}
