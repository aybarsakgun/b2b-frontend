import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {setContext} from '@apollo/client/link/context';
import {GRAPHQL_URL} from '../constants';
import {onError} from '@apollo/client/link/error';
import {Store} from '@ngxs/store';

export function createApollo(httpLink: HttpLink, store: Store): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext((operation, context) => {
    const token = store.selectSnapshot<string>((state => state.auth.accessToken));
    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
  });

  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        const errorMessage: string = error.message;
        console.warn(`graphqlError: ${errorMessage}`);
      });
    }
    if (networkError) {
      console.warn('networkError: ', networkError);
      if (networkError['error'].errors && networkError['error'].errors.length) {
        networkError.message = networkError['error'].errors.map(error => (error.message));
      }
    }
  });

  const link = ApolloLink.from([basic, auth, errorLink, httpLink.create({
    uri: GRAPHQL_URL,
  })]);

  const cache = new InMemoryCache();

  return {
    link,
    cache,
    // defaultOptions: {
    //   watchQuery: {
    //     fetchPolicy: 'network-only',
    //     errorPolicy: 'all',
    //   },
    //   query: {
    //     fetchPolicy: 'network-only',
    //     errorPolicy: 'all',
    //   }
    // }
  };
}

@NgModule({
  exports: [
    HttpClientModule,
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink, Store]
  }]
})
export class GraphQLModule {
}
