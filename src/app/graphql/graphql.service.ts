import {Apollo, gql} from 'apollo-angular';
import {Observable, Subscription, throwError} from 'rxjs';
import {DocumentNode} from 'graphql';
import {catchError, first, map, take} from 'rxjs/operators';

export abstract class GraphQLService {

  protected constructor(
    protected apollo: Apollo
  ) {
  }

  protected async query(query: DocumentNode, variables: any = null): Promise<any> {
    const queryOptions: any = {query: gql`${ query }`, ...variables && {variables}};
    return new Promise((resolve: (data) => void, reject: (data) => void) => {
      const subscription: Subscription = this.apollo.watchQuery<any>(queryOptions)
        .valueChanges.subscribe(({data, errors}) => {
          if (errors) {
            reject(errors.map(error => error.message).join(', ')); // TODO: GRAPHQL ERRORS
          } else {
            resolve(data);
          }
        }, (error: Error) => { // TODO: NETWORK ERRORS
          reject(error.message);
        }, () => {
          subscription.unsubscribe();
        });
    });
  }

  // protected async mutation(mutation: DocumentNode, variables: any = null): Promise<any> {
  //   const mutationOptions: any = {mutation: gql`${ mutation }`, ...variables && {variables}};
  //   return new Promise((resolve: (data) => void, reject: (data) => void) => {
  //     const subscription: Subscription = this.apollo.mutate(mutationOptions)
  //       .subscribe(({data, errors}) => {
  //         if (errors) {
  //           reject(errors.map(error => error.message).join(', ')); // TODO: GRAPHQL ERRORS
  //         } else {
  //           resolve(data);
  //         }
  //       }, (error: Error) => { // TODO: NETWORK ERRORS
  //         reject(error.message);
  //       }, () => {
  //         subscription.unsubscribe();
  //       });
  //   });
  // }

  protected mutation(mutation: DocumentNode, variables: any = null): Observable<any> {
    const mutationOptions: any = {
      mutation: gql`${ mutation }`,
      ...variables && {variables}
    };
    const gqlMutation = this.apollo.mutate(mutationOptions).pipe(
      first(),
      map(({data, errors}) => {
        if (errors) {
          return throwError(errors);
        }
        return data;
      }),
      catchError((error) => throwError(error))
    );
    return new Observable((observer) => {
      gqlMutation.pipe(take(1)).subscribe((result) => {
        // if (result) {
          observer.next(result);
          observer.complete();
        // } else {
        //   observer.error('GraphQL Error');
        //   observer.complete();
        // }
      }, (error: Error) => {
        // console.warn(error);
        observer.error(error.message);
        observer.complete();
      }, () => {
        observer.complete();
      });
    });
  }

  protected subscription(subscription: DocumentNode, variables: any = null): Observable<any> {
    const subscriptionOptions: any = {query: gql`${ subscription }`, ...variables && {variables}};
    return this.apollo.subscribe(subscriptionOptions);
  }
}
