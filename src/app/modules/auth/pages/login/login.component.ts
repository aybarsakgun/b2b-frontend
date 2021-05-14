import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {Auth} from '../../../../store/actions/auth/auth.action';
import {AuthState} from '../../../../store/states/auth/auth.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  @Select(AuthState.isLoading)
  public isLoading$: Observable<boolean>;

  @Select(AuthState.errors)
  public errors$: Observable<string[]>;

  public form: FormGroup;

  public shop: any;
  public currentYear: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.dispatch(new Auth.Login(this.form.getRawValue()));
  }
}
