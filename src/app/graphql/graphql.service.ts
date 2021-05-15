import {Apollo} from 'apollo-angular';
import {Observable, of, throwError} from 'rxjs';
import {DocumentNode} from 'graphql';
import {switchMap, take} from 'rxjs/operators';
import {ErrorResult} from './results/error.result';

export abstract class GraphQLService {

  protected constructor(
    protected apollo: Apollo
  ) {
  }

  protected execute<T>(type: 'query' | 'mutation' | 'subscription', documentNode: DocumentNode, variables: any = null, options?: {
    responseKey?: string;
  }): Observable<T> {
    let gqlOperation;
    switch (type) {
      case 'query':
        gqlOperation = this.apollo.watchQuery<T>({
          query: documentNode,
          ...variables && {variables}
        }).valueChanges;
        break;
      case 'mutation':
        gqlOperation = this.apollo.mutate<T>({
          mutation: documentNode,
          ...variables && {variables}
        });
        break;
      case 'subscription':
        gqlOperation = this.apollo.subscribe<T>({
          query: documentNode,
          ...variables && {variables}
        });
        break;
    }
    return new Observable((observer) => {
      gqlOperation.pipe(
        take(1),
        switchMap(({data, errors}) => {
          if (errors) {
            return throwError(errors.map((error) => ({
              message: error.message,
              type: error.extensions.code,
              code: error.extensions.exception.status
            })));
          }
          return of(options?.responseKey ? data[options.responseKey] : data);
        }),
      ).subscribe((result: T) => {
        observer.next(result);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      }, () => {
        observer.complete();
      });
    });
  }

  public subscriber<T>(
    observable: Observable<T>,
    onNext?: (data: T) => void,
    onError?: (data: ErrorResult) => void,
    onComplete?: () => void
  ): Observable<T> | void {
    observable.pipe(take(1)).subscribe((data) => {
      return onNext && onNext(data);
    }, (error: ErrorResult) => {
      return onError && onError(error);
    }, () => {
      return onComplete && onComplete();
    });
  }
}
