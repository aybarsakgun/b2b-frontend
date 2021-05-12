// tslint:disable-next-line:no-namespace
export namespace Auth {
  export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: {
      username: string;
      password: string;
    }) {}
  }

  export class LoginFailed {
    static readonly type = '[Auth API] Login Failed';
    constructor(public errors: string[]) {}
  }

  export class LoginSuccess {
    static readonly type = '[Auth API] Login Success';
    constructor(public payload: {
      accessToken: string;
      user: any;
    }) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }
}
