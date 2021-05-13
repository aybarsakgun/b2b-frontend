import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GraphQLService} from '../../graphql/graphql.service';
import {Observable} from 'rxjs';
import {AuthResults} from '../../graphql/results/auth/auth.results';
import {AUTH_LOGIN_MUTATION} from '../../graphql/mutations/auth/auth.mutations';

@Injectable()
export class AuthService extends GraphQLService {
  constructor(
    protected apollo: Apollo
  ) {
    super(apollo);
  }

  login(loginInput: {
    username: string;
    password: string;
  }): Observable<AuthResults.LoginResult> {
    return this.execute<AuthResults.LoginResult>('mutation', AUTH_LOGIN_MUTATION, {
      loginInput
    }, {
      responseKey: 'login'
    });
  }
}
