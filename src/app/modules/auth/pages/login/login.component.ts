import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {Auth} from '../../../../store/actions/auth/auth.action';
import Login = Auth.Login;
import {AuthState} from '../../../../store/states/auth/auth.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  @Select(AuthState.isLoading)
  public isLoading$: Observable<boolean>;

  public form: FormGroup;

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
    const {username, password} = this.form.getRawValue();
    this.store.dispatch(new Login({
      username,
      password
    }));
  }
}
