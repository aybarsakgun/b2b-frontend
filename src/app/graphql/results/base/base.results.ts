import {CurrencyModel} from '../../../models/currency/currency.model';
import {CategoryModel} from '../../../models/product/category.model';
import {SettingModel} from '../../../models/setting/setting.model';

export namespace BaseResults {
  export class FetchBasesResult {
    currencies: CurrencyModel[];
    categories: CategoryModel[];
  }
  export class FetchSettingsResult {
    settings: SettingModel[];
  }
}
