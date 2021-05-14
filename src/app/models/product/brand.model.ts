import {BaseModel} from '../base.model';
import {ModelModel} from './model.model';

export class BrandModel extends BaseModel {
  id: number;
  name: string;
  code: string;
  models: ModelModel[];
  productCount: number;
}
