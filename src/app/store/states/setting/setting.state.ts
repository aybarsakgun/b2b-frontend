import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {catchError, take, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ErrorResult} from '../../../graphql/results/error.result';
import {Setting} from '../../actions/setting/setting.action';
import {SettingResults} from '../../../graphql/results/setting/setting.results';
import {SettingService} from '../../../shared/services/setting.service';

export interface SettingStateModel {
  settings: {};
  loading: boolean;
  errors: string[];
}

export const SETTING_STATE_TOKEN = new StateToken<SettingStateModel>('setting');

@State<SettingStateModel>({
  name: SETTING_STATE_TOKEN,
  defaults: {
    settings: {},
    loading: false,
    errors: []
  }
})
@Injectable()
export class SettingState {
  @Selector()
  static isLoading(state: SettingStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static errors(state: SettingStateModel): string[] {
    return state.errors;
  }

  constructor(
    private settingService: SettingService
  ) {
  }

  @Action(Setting.Fetch)
  fetch({patchState, dispatch}: StateContext<SettingStateModel>): Observable<SettingResults.FetchResult> {
    patchState({
      loading: true
    });
    return this.settingService.fetchSettings().pipe(
      take(1),
      tap((result) => {
        return dispatch(new Setting.FetchSuccess(result.settings.reduce((map, obj) => {
          map[obj.key] = obj.value;
          return map;
        }, {})));
      }),
      catchError((error: ErrorResult) => {
        dispatch(new Setting.FetchFailed(error.map((err) => (err.message))));
        return throwError(error);
      })
    );
  }

  @Action(Setting.FetchFailed)
  fetchFailed({setState}: StateContext<SettingStateModel>, {errors}: Setting.FetchFailed): void {
    setState({
      settings: {}, // Todo: fill with init settings
      loading: false,
      errors
    });
  }

  @Action(Setting.FetchSuccess)
  fetchSuccess({setState}: StateContext<SettingStateModel>, {payload}: Setting.FetchSuccess): void {
    setState({
      settings: payload,
      loading: false,
      errors: []
    });
  }
}
