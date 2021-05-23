export namespace Setting {
  export class Fetch {
    static readonly type = '[Setting] Fetch';
  }

  export class FetchFailed {
    static readonly type = '[Setting] Fetch Failed';

    constructor(public errors: string[]) {
    }
  }

  export class FetchSuccess {
    static readonly type = '[Setting] Fetch Success';

    constructor(public payload: { [settingKey: string]: any }) {
    }
  }
}
