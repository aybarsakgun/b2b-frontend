import {CategoryModel} from '../../../models/product/category.model';
import {CurrencyModel} from '../../../models/currency/currency.model';

export namespace Base {
  export class Fetch {
    static readonly type = '[Base] Fetch';
  }

  export class FetchFailed {
    static readonly type = '[Base] Fetch Failed';

    constructor(public errors: string[]) {
    }
  }

  export class FetchSuccess {
    static readonly type = '[Base] Fetch Success';

    constructor(public payload: {
      currencies: CurrencyModel[],
      activeCurrency: CurrencyModel,
      categories: CategoryModel[]
    }) {
    }
  }

  export class ChangeActiveCurrency {
    static readonly type = '[Base] Change Active Currency';

    constructor(public payload: {
      currency: CurrencyModel
    }) {
    }
  }
}
