import {BaseModel} from '../base.model';

export class SettingModel extends BaseModel {
  id: number;
  key: string;
  value: string;
}
