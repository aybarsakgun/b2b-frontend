import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GraphQLService} from '../../graphql/graphql.service';
import {Observable} from 'rxjs';
import {FETCH_BASES_QUERY, FETCH_SETTINGS_QUERY} from '../../graphql/queries/base/base.queries';
import {BaseResults} from '../../graphql/results/base/base.results';

@Injectable({
  providedIn: 'root'
})
export class BaseService extends GraphQLService {
  constructor(
    protected apollo: Apollo
  ) {
    super(apollo);
  }

  fetchSettings(): Observable<BaseResults.FetchSettingsResult> {
    return this.execute<BaseResults.FetchSettingsResult>('query', FETCH_SETTINGS_QUERY);
  }

  fetchBases(): Observable<BaseResults.FetchBasesResult> {
    return this.execute<BaseResults.FetchBasesResult>('query', FETCH_BASES_QUERY);
  }
}
