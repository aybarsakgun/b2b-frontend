import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GraphQLService} from '../../graphql/graphql.service';
import {Observable} from 'rxjs';
import {SettingResults} from '../../graphql/results/setting/setting.results';
import {SETTING_FETCH_SETTINGS} from '../../graphql/queries/setting/setting.queries';

@Injectable({
  providedIn: 'root'
})
export class SettingService extends GraphQLService {
  constructor(
    protected apollo: Apollo
  ) {
    super(apollo);
  }

  fetchSettings(): Observable<SettingResults.FetchResult> {
    return this.execute<SettingResults.FetchResult>('query', SETTING_FETCH_SETTINGS);
  }
}
