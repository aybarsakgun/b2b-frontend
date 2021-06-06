import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {Auth} from '../../../../store/actions/auth/auth.action';
import {AuthState} from '../../../../store/states/auth/auth.state';
import {Observable, Subject} from 'rxjs';
import {Navigate} from '@ngxs/router-plugin';
import {Base} from '../../../../store/actions/base/base.action';
import {takeUntil} from 'rxjs/operators';
import {BASE_STATE_TOKEN, BaseState} from '../../../../store/states/base/base.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {
  @Select(AuthState.isLoading)
  public isAuthLoading$: Observable<boolean>;

  @Select(BaseState.isLoading)
  public isBasesLoading$: Observable<boolean>;

  @Select(AuthState.errors)
  public errors$: Observable<string[]>;

  public form: FormGroup;

  public shop: any;
  public currentYear: number = new Date().getFullYear();

  private actionSubscriber = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private actions$: Actions
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.actions$.pipe(
      ofActionSuccessful(Auth.LoginSuccess),
      takeUntil(this.actionSubscriber)
    ).subscribe(() => {
      if (!this.store.selectSnapshot(BASE_STATE_TOKEN).fetched) {
        this.store.dispatch(new Base.Fetch());
      }
      this.store.dispatch(new Navigate(['/']));
    });
  }

  public login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.dispatch(new Auth.Login(this.form.getRawValue()));
  }

  ngOnDestroy(): void {
    this.actionSubscriber.next();
    this.actionSubscriber.complete();
  }
}
