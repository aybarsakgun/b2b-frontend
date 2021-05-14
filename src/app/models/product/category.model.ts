import {BaseModel} from '../base.model';

export class CategoryModel extends BaseModel {
  id: number;
  name: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  seo: string;
  order: number;
  parent: CategoryModel;
  children: CategoryModel[];
  productCount: number;
}
