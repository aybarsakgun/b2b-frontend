import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {catchError, take, tap} from 'rxjs/operators';
import {ErrorResult} from '../../../graphql/results/error.result';
import {Setting} from '../../actions/setting/setting.action';
import {BaseService} from '../../../shared/services/base.service';

export interface SettingStateModel {
  settings: {
    [settingKey: string]: string
  };
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
    private baseService: BaseService
  ) {
  }

  @Action(Setting.Fetch)
  fetch({patchState, dispatch}: StateContext<SettingStateModel>): any {
    patchState({
      loading: true
    });
    return this.baseService.fetchSettings().pipe(
      take(1),
      tap((result) => {
        return dispatch(new Setting.FetchSuccess(result.settings.reduce((map, obj) => {
          map[obj.key] = obj.value;
          return map;
        }, {})));
      }),
      catchError((error: ErrorResult) => {
        return dispatch(new Setting.FetchFailed(error.map((err) => (err.message))));
      }),
    );
  }

  @Action(Setting.FetchFailed)
  fetchFailed({setState}: StateContext<SettingStateModel>, {errors}: Setting.FetchFailed): void {
    setState({
      settings: {},
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
