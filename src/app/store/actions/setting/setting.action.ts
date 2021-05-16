export namespace Setting {
  export class Fetch {
    static readonly type = '[Setting] Fetch';
  }

  export class FetchFailed {
    static readonly type = '[Auth API] Fetch Failed';

    constructor(public errors: string[]) {
    }
  }

  export class FetchSuccess {
    static readonly type = '[Auth API] Fetch Success';

    constructor(public payload: { [settingKey: string]: any }) {
    }
  }
}
