import {SettingModel} from '../../../models/setting/setting.model';

export namespace SettingResults {
  export class FetchResult {
    settings: SettingModel[];
  }
}
