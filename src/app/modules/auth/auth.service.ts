import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GraphQLService} from '../../graphql/graphql.service';
import {Observable} from 'rxjs';
import {AuthResults} from '../../graphql/results/auth/auth.results';
import {LOGIN_MUTATION} from '../../graphql/mutations/auth/auth.mutations';
import {CURRENT_USER_QUERY} from '../../graphql/queries/user/user.queries';

@Injectable({
  providedIn: 'root'
})
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
    return this.execute<AuthResults.LoginResult>('mutation', LOGIN_MUTATION, {
      loginInput
    }, {
      responseKey: 'login'
    });
  }

  currentUser(): Observable<AuthResults.CurrentUserResult> {
    return this.execute<AuthResults.CurrentUserResult>('query', CURRENT_USER_QUERY, null, {
      responseKey: 'currentUser'
    });
  }
}
