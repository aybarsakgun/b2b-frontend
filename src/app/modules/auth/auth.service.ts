import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GraphQLService} from '../../graphql/graphql.service';
import {DocumentNode, gql} from '@apollo/client/core';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService extends GraphQLService {
  constructor(
    protected apollo: Apollo
  ) {
    super(apollo);
  }

  login(username: string, password: string): Observable<any> {
    const mutation: DocumentNode = gql`
      mutation login($loginInput: LoginInput!){
        login(data: $loginInput){
          token
          user{
            id
            username
            email
            currency
            name
            customerId
            role
            isActive
            branches{
              id
              name
            }
            salesRepresentative{
              id
              name
              phone
              email
            }
            priceOrder
            branch
          }
        }
      }
    `;
    return this.mutation(mutation, {loginInput: {username, password}});
    // try {
    //   const {login} = await this.mutation(mutation, {loginInput: {username, password}});
    //   return login;
    // } catch (e) {
    //   throw new Error(e);
    // }
  }
}
