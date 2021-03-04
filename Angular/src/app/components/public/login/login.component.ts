import { Component } from '@angular/core';

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  loginBar: boolean = false;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loginBar = true;
      this.authService
        .login(this.username.value, this.password.value)
        .subscribe((resp) => {
          if (resp) {
            this.router.navigate(['/dashboard']);
            this.authService.logged = true;
            this.authService.loggedState.next(true);
            this.loginBar = false;
          } else {
            alert(
              'Login incorrecto. \n Pss... User: master Password: 12345678'
            );
            this.loginBar = false;
          }
        });
    }
  }

  get username() {
    return this.form.get('username') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }
}
