import {BaseModel} from '../base.model';
import {BrandModel} from './brand.model';

export class ModelModel extends BaseModel {
  id: number;
  name: string;
  brand: BrandModel;
  productCount: number;
}
