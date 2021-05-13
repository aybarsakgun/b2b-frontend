import {UserModel} from '../../../models/user/user.model';

export namespace AuthResults {
  export class LoginResult {
    token: string;
    user: UserModel;
  }
}
