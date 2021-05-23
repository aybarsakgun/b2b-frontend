import {BaseModel} from '../base.model';

export class CurrencyModel extends BaseModel {
  id: number;
  code: string;
  name: string;
  symbol: string;
  exchangeRate: string;
}
